import { ExpressRequestHandlerBase } from './request-handler-base';
import { RequestHandlerContext } from './request-handler-context';

export class ExpressCallApiRequestHandler extends ExpressRequestHandlerBase {
    public async handle(ctx: RequestHandlerContext) {
        try {
            if (ctx.err)
                return;

            ctx.apiResp.data = await ctx.api.call();
        } catch (ex) {
            ctx.err = ex;
        } finally {
            await this.next?.handle(ctx);
        }
    }
}