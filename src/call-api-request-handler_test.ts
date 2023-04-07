import { deepStrictEqual } from 'assert';
import { Mock } from 'lite-ts-mock';

import { ExpressCallApiRequestHandler as Self } from './call-api-request-handler';
import { IApi } from './i-api';

describe('src/call-api-request-handler_test.ts', () => {
    describe('.handle(ctx: RequestHandlerContext)', () => {
        it('ok', async () => {
            const self = new Self();

            const mockApi = new Mock<IApi>();
            mockApi.expectReturn(
                r => r.call(),
                'tt'
            );

            const ctx = {
                api: mockApi.actual,
                apiResp: {},
            } as any;
            await self.handle(ctx);

            deepStrictEqual(ctx.apiResp, {
                data: 'tt'
            });
        });
    });
});