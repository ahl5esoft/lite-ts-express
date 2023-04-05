import { ApiResponse } from 'lite-ts-rpc';

import { ExpressRequestHandlerBase } from './request-handler-base';
import { RequestHandlerContext } from './request-handler-context';

export class ExpressGetRequestHandler extends ExpressRequestHandlerBase {
    public constructor(
        private m_ResponseData: any,
    ) {
        super();
    }

    public async handle(ctx: RequestHandlerContext) {
        ctx.resp.json({
            data: this.m_ResponseData,
            err: 0,
        } as ApiResponse<any>)
    }
}