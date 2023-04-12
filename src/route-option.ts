import { Request, Response } from 'express';

import { ExpressOption } from './option';
import { ExpressRequestHandlerBase } from './request-handler-base';

export function routeExpressOption(method: string, routeRule: string, handler: ExpressRequestHandlerBase): ExpressOption {
    return app => {
        app[method](routeRule, async (req: Request, resp: Response) => {
            await handler.handle({
                apiResp: {
                    data: null,
                    err: 0,
                },
                req,
                resp,
            });
        });
    };
}