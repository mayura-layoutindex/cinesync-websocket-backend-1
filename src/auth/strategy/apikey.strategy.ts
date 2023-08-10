import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  "api_key"
) {
  constructor(private authService: AuthService) {
    super({ header: "api_key", prefix: "" }, true, async (apiKey, done) => {
      if (this.authService.verifyApiKey(apiKey)) {
        done(null, true);
      }
      done(new UnauthorizedException("Invalid api key"), null);
    });
  }
}
