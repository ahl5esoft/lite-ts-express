import { ISession } from './i-session';
import { SessionData } from './session-data';

export class ExpressSession implements ISession {
    public get isOptionalSession() {
        return false;
    }

    protected session: SessionData;

    public async initSession(data: SessionData) {
        this.session = data;
    }
}

export class ExpressOptionalSession extends ExpressSession {
    public get isOptionalSession() {
        return true;
    }
}