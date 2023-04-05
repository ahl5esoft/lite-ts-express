import { RequestHandlerContext } from './request-handler-context';

export abstract class ExpressRequestHandlerBase {
    protected next: ExpressRequestHandlerBase;

    public setNext(next: ExpressRequestHandlerBase) {
        this.next = next;
        return this;
    }

    public abstract handle(ctx: RequestHandlerContext): Promise<void>;
}