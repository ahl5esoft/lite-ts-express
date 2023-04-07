import { Request, Response } from 'express';
import { opentracing } from 'jaeger-client';
import { ILog } from 'lite-ts-log';
import { ApiResponse } from 'lite-ts-rpc';

import { IApi } from './i-api';
import { Route } from './route';

export type RequestHandlerContext = {
    [key: string]: any;

    apiResp: ApiResponse<any>;
    resp: Response;
    req: Request;
    api?: IApi;
    log?: ILog;
    err?: Error;
    route?: Route;
    tracerSpan?: opentracing.Span;
}