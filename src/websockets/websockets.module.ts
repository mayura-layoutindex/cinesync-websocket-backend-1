import { Module } from "@nestjs/common";
import { WebsocketsGateway } from "./websockets.gateway";
import { WebsocketsService } from "./websockets.service";
import { BookingGateway } from "./bookingsockets.gateway";

@Module({
  providers: [WebsocketsService, WebsocketsGateway, BookingGateway],
  exports: [WebsocketsService],
})
export class WebsocketsModule {}
