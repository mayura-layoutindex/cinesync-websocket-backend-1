import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class BookingGateway {
  private orgs: string[] = [];
  private bookings: string[] = [];

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    // Send the current bookings array to the client
    client.emit("initialBookings", this.bookings);
  }

  @SubscribeMessage("booking")
  handleBooking(client: Socket, message: string): void {
    console.log(`${client.id}: ${message}`);

    const existingIndex = this.bookings.indexOf(message);
    if (existingIndex !== -1) {
      // Remove existing booking
      this.bookings.splice(existingIndex, 1);
    } else {
      // Add new booking
      this.bookings.push(message);
    }

    console.log(this.bookings);
    this.server.emit("booking", message);
  }
}
