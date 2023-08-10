import { Injectable } from "@nestjs/common";
import { WebsocketsService } from "./websockets/websockets.service";
import { generateResponse } from "./utils/response_data";

@Injectable()
export class AppService {
  constructor(private readonly websocketsService: WebsocketsService) {}

  addEvent(name: string, data: string) {
    this.websocketsService.addEvent(name, data);
    return generateResponse(true, 200, "Notification send successful", {});
  }
}
