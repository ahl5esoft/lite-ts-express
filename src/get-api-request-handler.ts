import { validate } from 'class-validator';
import { CustomError, ErrorCode } from 'lite-ts-error';

import { ApiFactoryBase } from './api-factory-base';
import { ExpressRequestHandlerBase } from './request-handler-base';
import { RequestHandlerContext } from './request-handler-context';

export class ExpressGetApiRequestHandler extends ExpressRequestHandlerBase {
    public constructor(
        private m_ApiFactory: ApiFactoryBase,
        private m_IsDisplayValidateError: boolean,
    ) {
        super();
    }

    public async handle(ctx: RequestHandlerContext) {
        try {
            if (ctx.err)
                return;

            ctx.route ??= {
                api: ctx.req.params.api,
                endpoint: ctx.req.params.endpoint,
            };
            ctx.api = await this.m_ApiFactory.build(ctx.route.endpoint, ctx.route.api);
            for (const r of ['body', 'headers']) {
                if (r in ctx.req) {
                    const keys = Object.keys(ctx.req[r]);
                    if (!keys.length)
                        continue;

                    if (r == 'body') {
                        Object.keys(ctx.req[r]).forEach(cr => {
                            if (cr in ctx.api)
                                return;

                            ctx.api[cr] = ctx.req[r][cr];
                        });
                    }
                }
            }

            const validationErrors = await validate(ctx.api);
            if (validationErrors.length) {
                throw new CustomError(
                    ErrorCode.verify,
                    this.m_IsDisplayValidateError ? validationErrors.toString() : '',
                );
            }
        } catch (ex) {
            ctx.err = ex;
        } finally {
            await this.next?.handle(ctx);
        }
    }
}