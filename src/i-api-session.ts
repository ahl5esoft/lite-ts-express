import { SessionData } from './session-data';

export interface IApiSession {
    initSession(data: SessionData): Promise<void>;
}