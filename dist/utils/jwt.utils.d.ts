import * as jwt from "jsonwebtoken";
export declare function verifyApiKey(apiKey: string): string | false | jwt.JwtPayload;
