import { OnApplicationShutdown } from "@nestjs/common";
import { OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { WebsocketsService } from "./websockets.service";
import { BookingGateway } from "./bookingsockets.gateway";
export declare class WebsocketsGateway implements OnGatewayInit, OnApplicationShutdown, OnGatewayDisconnect {
    private readonly service;
    private readonly bookingGateway;
    private subscription;
    constructor(service: WebsocketsService, bookingGateway: BookingGateway);
    afterInit(server: Server): void;
    onApplicationShutdown(): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(server: Server): void;
}
