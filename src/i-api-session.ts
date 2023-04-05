export interface IApiSession {
    initSession(req: any): Promise<void>;
}