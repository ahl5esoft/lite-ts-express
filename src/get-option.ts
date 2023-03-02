import { Express, Request, Response } from 'express';

import { IApiResponse } from './i-api-response';

export function expressGetOption(v: any) {
    return function (app: Express) {
        app.get('/', (_: Request, resp: Response) => {
            resp.json({
                data: v,
                err: 0,
            } as IApiResponse);
        });
    };
}