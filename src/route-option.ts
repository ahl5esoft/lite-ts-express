import { Request, Response } from 'express';

import { ExpressOption } from './option';
import { RequestHandlerContext } from './request-handler-context';
import { ExpressRequestHandlerBase } from './request-handler-base';

export function routeExpressOption(
    method: string,
    routeRule: string,
    ...handlers: ExpressRequestHandlerBase[]
): ExpressOption {
    return app => {
        app[method](routeRule, async (req: Request, resp: Response) => {
            const ctx: RequestHandlerContext = { req, resp };
            for (const r of handlers) {
                await r.handle(ctx);
            }
        });
    };
}