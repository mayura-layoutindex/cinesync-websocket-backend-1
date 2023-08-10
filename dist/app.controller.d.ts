import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
export declare class AppController {
    private readonly appService;
    private readonly authService;
    constructor(appService: AppService, authService: AuthService);
    generateToken(body: {
        access_code: string;
        device: string;
    }): Promise<{
        status: boolean;
        status_code: number;
        message: string;
        data: object;
    }>;
    addWebsocketEvent(body: {
        name: string;
        data: string;
    }): {
        status: boolean;
        status_code: number;
        message: string;
        data: object;
    };
}
