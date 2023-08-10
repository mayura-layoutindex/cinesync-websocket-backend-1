import * as jwt from "jsonwebtoken";
export declare class AuthService {
    verifyApiKey(apiKey: string): string | false | jwt.JwtPayload;
    generateApiKey(body: {
        access_code: string;
        device: string;
    }): Promise<{
        status: boolean;
        status_code: number;
        message: string;
        data: object;
    }>;
}
