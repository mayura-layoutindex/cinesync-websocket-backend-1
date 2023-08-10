import { Server, Socket } from "socket.io";
export declare class BookingGateway {
    private orgs;
    private bookings;
    server: Server;
    handleConnection(client: Socket): void;
    handleBooking(client: Socket, message: string): void;
}
