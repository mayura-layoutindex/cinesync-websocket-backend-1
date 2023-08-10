import { Observable } from 'rxjs';
interface WebsocketEvent {
    name: string;
    data: unknown;
}
export declare class WebsocketsService {
    private subject;
    addEvent(eventName: string, eventData: unknown): void;
    getEventSubject$(): Observable<WebsocketEvent>;
}
export {};
