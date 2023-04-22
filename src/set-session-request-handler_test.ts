import { deepStrictEqual, strictEqual } from 'assert';
import { CryptoBase } from 'lite-ts-crypto';
import { Mock } from 'lite-ts-mock';
import { RpcHeader } from 'lite-ts-rpc';

import { ExpressRequestHandlerBase } from './request-handler-base';
import { ExpressSetSessionRequestHandler as Self } from './set-session-request-handler';

describe('src/set-session-request-handler.ts', () => {
    describe('.handle(ctx: RequestHandlerContext)', () => {
        it('ok', async () => {
            const mockCrypto = new Mock<CryptoBase>();
            const self = new Self(mockCrypto.actual);

            mockCrypto.expectReturn(
                r => r.decrypt('ciper'),
                {
                    id: 'uid'
                }
            );

            const mockHandler = new Mock<ExpressRequestHandlerBase>();
            self.setNext(mockHandler.actual);

            const ctx = {
                api: {
                    initSession: (arg: any) => {
                        deepStrictEqual(arg, {
                            id: 'uid'
                        });
                    }
                },
                req: {
                    get: (k: string) => {
                        strictEqual(k, RpcHeader.authData);
                        return 'ciper';
                    }
                }
            } as any;
            mockHandler.expected.handle(ctx);

            await self.handle(ctx);
        });

        it('err auth', async () => {
            const mockCrypto = new Mock<CryptoBase>();
            const self = new Self(mockCrypto.actual);

            const mockHandler = new Mock<ExpressRequestHandlerBase>();
            self.setNext(mockHandler.actual);

            const ctx = {
                api: {
                    initSession: 1
                },
                req: {
                    get: () => { },
                    headers: {},
                }
            } as any;
            mockHandler.expected.handle(ctx);

            await self.handle(ctx);

            strictEqual(ctx.err, Self.errAuth);
        });

        it('session is optional', async () => {
            const mockCrypto = new Mock<CryptoBase>();
            const self = new Self(mockCrypto.actual);

            const mockHandler = new Mock<ExpressRequestHandlerBase>();
            self.setNext(mockHandler.actual);

            const ctx = {
                api: {
                    isOptionalSession: true,
                    initSession: 1
                },
                req: {
                    get: () => { },
                    headers: {},
                }
            } as any;
            mockHandler.expected.handle(ctx);

            await self.handle(ctx);

            strictEqual(ctx.err, undefined);
        });

        it('not api session', async () => {
            const self = new Self(null);

            const mockHandler = new Mock<ExpressRequestHandlerBase>();
            self.setNext(mockHandler.actual);

            const ctx = {} as any;
            mockHandler.expected.handle(ctx);

            await self.handle(ctx);
        });
    });
});