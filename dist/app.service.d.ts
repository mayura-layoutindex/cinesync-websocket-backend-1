import { WebsocketsService } from "./websockets/websockets.service";
export declare class AppService {
    private readonly websocketsService;
    constructor(websocketsService: WebsocketsService);
    addEvent(name: string, data: string): {
        status: boolean;
        status_code: number;
        message: string;
        data: object;
    };
}
