import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiKeyAuthGurad } from "./auth/guard/apikey-auth.guard";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Post("generate-api-key")
  async generateToken(@Body() body: { access_code: string; device: string }) {
    return this.authService.generateApiKey(body);
  }

  @UseGuards(ApiKeyAuthGurad)
  @Post()
  addWebsocketEvent(@Body() body: { name: string; data: string }) {
    return this.appService.addEvent(body.name, body.data);
  }
}
