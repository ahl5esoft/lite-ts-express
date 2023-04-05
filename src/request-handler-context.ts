import { Request, Response } from 'express';

export type RequestHandlerContext = {
    [key: string]: any;

    req: Request;
    resp: Response;
}