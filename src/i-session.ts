import { SessionData } from './session-data';

export interface ISession {
    readonly isOptionalSession: boolean;
    initSession(data: SessionData): Promise<void>;
}