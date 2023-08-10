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
exports.WebsocketsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const websockets_service_1 = require("./websockets.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const bookingsockets_gateway_1 = require("./bookingsockets.gateway");
let WebsocketsGateway = class WebsocketsGateway {
    constructor(service, bookingGateway) {
        this.service = service;
        this.bookingGateway = bookingGateway;
    }
    afterInit(server) {
        this.subscription = this.service.getEventSubject$().subscribe({
            next: (event) => server.emit(event.name, event.data),
            error: (err) => server.emit("exception", err.toString()),
        });
    }
    onApplicationShutdown() {
        this.subscription.unsubscribe();
    }
    handleConnection(client, ...args) {
        var _a, _b;
        const headerParams = client.handshake.headers;
        const apiKey = ((_a = headerParams.api_key) === null || _a === void 0 ? void 0 : _a.toString()) || ((_b = client.handshake.auth) === null || _b === void 0 ? void 0 : _b.token);
        if (apiKey && (0, jwt_utils_1.verifyApiKey)(apiKey)) {
            console.log(`Client ${client.id} connected with valid api_key`);
        }
        else {
            console.log(`Client ${client.id} tried to connect without valid api_key`);
            client.disconnect();
        }
    }
    handleDisconnect(server) {
        server.emit("closed");
    }
};
WebsocketsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [websockets_service_1.WebsocketsService,
        bookingsockets_gateway_1.BookingGateway])
], WebsocketsGateway);
exports.WebsocketsGateway = WebsocketsGateway;
//# sourceMappingURL=websockets.gateway.js.map