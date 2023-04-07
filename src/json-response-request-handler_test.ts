import { deepStrictEqual } from 'assert';
import { CustomError } from 'lite-ts-error';

import { ExpressJsonResponseRequestHandler as Self } from './json-response-request-handler';

describe('src/json-response-request-handler.ts', () => {
    describe('.handle(ctx: RequestHandlerContext)', () => {
        it('err', async () => {
            const self = new Self();

            await self.handle({
                apiResp: {},
                err: new CustomError(11, 'tt'),
                resp: {
                    json: (arg: any) => {
                        deepStrictEqual(arg, {
                            data: 'tt',
                            err: 11,
                        })
                    }
                },
            } as any);
        });

        it('ok', async () => {
            const self = new Self();

            await self.handle({
                apiResp: {
                    data: 'tt'
                },
                resp: {
                    json: (arg: any) => {
                        deepStrictEqual(arg, {
                            data: 'tt',
                        })
                    }
                }
            } as any);
        });
    });
});