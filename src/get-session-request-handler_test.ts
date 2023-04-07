import { deepStrictEqual, strictEqual } from 'assert';
import { CryptoBase } from 'lite-ts-crypto';
import { Mock } from 'lite-ts-mock';
import { Header, RpcBase } from 'lite-ts-rpc';

import { ExpressGetSessionRequestHandler as Self } from './get-session-request-handler';
import { ExpressRequestHandlerBase } from './request-handler-base';

describe('src/get-session-request-handler.ts', () => {
    describe('.handle(ctx: RequestHandlerContext)', () => {
        it('ctx.err', async () => {
            const self = new Self(null, null, null);

            const mockHandler = new Mock<ExpressRequestHandlerBase>();
            self.setNext(mockHandler.actual);

            const ctx = {
                err: new Error('err')
            } as any;
            mockHandler.expected.handle(ctx);

            await self.handle(ctx);
        });

        it('token不存在', async () => {
            const self = new Self(null, null, null);

            const mockHandler = new Mock<ExpressRequestHandlerBase>();
            self.setNext(mockHandler.actual);

            const ctx = {
                err: new Error('err'),
                req: {
                    get: (arg: string) => {
                        strictEqual(arg, Header.authToken);
                    }
                }
            } as any;
            mockHandler.expected.handle(ctx);

            await self.handle(ctx);
        });

        it('ok', async () => {
            const mockCrypto = new Mock<CryptoBase>();
            const mockRpc = new Mock<RpcBase>();
            const self = new Self(mockCrypto.actual, mockRpc.actual, {
                b: 'route'
            });

            mockRpc.expectReturn(
                r => r.call({
                    body: {
                        token: 'token',
                    },
                    isThrow: true,
                    route: 'route'
                }),
                {
                    data: {
                        id: 'uid'
                    }
                }
            );

            mockCrypto.expectReturn(
                r => r.encrypt(`{"id":"uid"}`),
                'ciper'
            );

            const mockHandler = new Mock<ExpressRequestHandlerBase>();
            self.setNext(mockHandler.actual);

            const ctx = {
                req: {
                    get: () => {
                        return 'token';
                    },
                    headers: {
                        [Header.authData]: '',
                        [Header.authToken]: 'at'
                    },
                    path: '/a/b/c'
                }
            } as any;
            mockHandler.expected.handle(ctx);

            await self.handle(ctx);

            deepStrictEqual(ctx.req.headers, {
                [Header.authData]: 'ciper'
            });
        });
    });
});