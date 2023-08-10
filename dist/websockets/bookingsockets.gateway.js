"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let BookingGateway = class BookingGateway {
    constructor() {
        this.orgs = [];
        this.bookings = [];
    }
    handleConnection(client) {
        client.emit("initialBookings", this.bookings);
    }
    handleBooking(client, message) {
        console.log(`${client.id}: ${message}`);
        const existingIndex = this.bookings.indexOf(message);
        if (existingIndex !== -1) {
            this.bookings.splice(existingIndex, 1);
        }
        else {
            this.bookings.push(message);
        }
        console.log(this.bookings);
        this.server.emit("booking", message);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], BookingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("booking"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], BookingGateway.prototype, "handleBooking", null);
BookingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], BookingGateway);
exports.BookingGateway = BookingGateway;
//# sourceMappingURL=bookingsockets.gateway.js.map