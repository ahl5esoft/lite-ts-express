import { deepStrictEqual } from 'assert';

import { ExpressGetRequestHandler as Self } from './get-request-handler';

describe('src/get-request-handler.ts', () => {
    describe('.handle(ctx: RequestHandlerContext)', () => {
        it('ok', async () => {
            await new Self('hello').handle({
                resp: {
                    json: (v: any) => {
                        deepStrictEqual(v, {
                            data: 'hello',
                            err: 0
                        });
                    }
                }
            } as any)
        });
    });
});