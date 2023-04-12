import { RequestHandlerContext } from './request-handler-context';

export abstract class ExpressRequestHandlerBase {
    protected next: ExpressRequestHandlerBase;

    public setNext(next: ExpressRequestHandlerBase) {
        this.next = next;
        return this.next;
    }

    public abstract handle(ctx: RequestHandlerContext): Promise<void>;
}