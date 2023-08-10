import { OnApplicationShutdown } from "@nestjs/common";
import {
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Subscription } from "rxjs";
import { Server, Socket } from "socket.io";
import { WebsocketsService } from "./websockets.service";
import { verifyApiKey } from "src/utils/jwt.utils";
import { BookingGateway } from "./bookingsockets.gateway";

@WebSocketGateway()
export class WebsocketsGateway
  implements OnGatewayInit, OnApplicationShutdown, OnGatewayDisconnect
{
  private subscription: Subscription;
  constructor(
    private readonly service: WebsocketsService,
    private readonly bookingGateway: BookingGateway
  ) {}

  afterInit(server: Server): void {
    this.subscription = this.service.getEventSubject$().subscribe({
      next: (event) => server.emit(event.name, event.data),
      error: (err) => server.emit("exception", err.toString()),
    });
  }

  onApplicationShutdown() {
    this.subscription.unsubscribe();
  }

  handleConnection(client: Socket, ...args: any[]): void {
    const headerParams = client.handshake.headers;
    const apiKey =
      headerParams.api_key?.toString() || client.handshake.auth?.token;

    if (apiKey && verifyApiKey(apiKey)) {
      console.log(`Client ${client.id} connected with valid api_key`);
    } else {
      console.log(`Client ${client.id} tried to connect without valid api_key`);
      client.disconnect();
    }
  }

  handleDisconnect(server: Server) {
    server.emit("closed");
  }
}
