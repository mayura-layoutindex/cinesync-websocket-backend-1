import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class ApiKeyAuthGurad extends AuthGuard("api_key") {}
