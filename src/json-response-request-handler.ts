import { CustomError, ErrorCode } from 'lite-ts-error';

import { ExpressRequestHandlerBase } from './request-handler-base';
import { RequestHandlerContext } from './request-handler-context';

export class ExpressJsonResponseRequestHandler extends ExpressRequestHandlerBase {
    public async handle(ctx: RequestHandlerContext) {
        if (ctx.err) {
            if (ctx.err instanceof CustomError) {
                ctx.apiResp.data = ctx.err.data;
                ctx.apiResp.err = ctx.err.code;
            } else {
                ctx.apiResp.err = ErrorCode.panic;
            }
        }

        ctx.resp.json(ctx.apiResp);
    }
}