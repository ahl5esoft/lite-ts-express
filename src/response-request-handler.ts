import { CustomError, ErrorCode } from 'lite-ts-error';

import { ExpressRequestHandlerBase } from './request-handler-base';
import { RequestHandlerContext } from './request-handler-context';

export class ExpressResponseRequestHandler extends ExpressRequestHandlerBase {
    public constructor(
        private m_Action = (ctx: RequestHandlerContext) => {
            if (ctx.err) {
                if (ctx.err instanceof CustomError) {
                    ctx.apiResp.data = ctx.err.data;
                    ctx.apiResp.err = ctx.err.code;
                } else {
                    ctx.apiResp.err = ErrorCode.panic;
                }
            }

            ctx.resp.json(ctx.apiResp);
        },
    ) {
        super();
    }

    public async handle(ctx: RequestHandlerContext) {
        this.m_Action(ctx);
    }
}