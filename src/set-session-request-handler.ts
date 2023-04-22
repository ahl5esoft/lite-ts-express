import { CryptoBase } from 'lite-ts-crypto';
import { CustomError, ErrorCode } from 'lite-ts-error';
import { RpcHeader } from 'lite-ts-rpc';

import { ISession } from './i-session';
import { ExpressRequestHandlerBase } from './request-handler-base';
import { RequestHandlerContext } from './request-handler-context';

export class ExpressSetSessionRequestHandler extends ExpressRequestHandlerBase {
    public static errAuth = new CustomError(ErrorCode.auth);

    public constructor(
        private m_Crypto: CryptoBase,
    ) {
        super();
    }

    public async handle(ctx: RequestHandlerContext) {
        try {
            if (ctx.err)
                return;

            const session = ctx.api as any as ISession;
            if (!session?.initSession)
                return;

            const ciperText = ctx.req.get(RpcHeader.authData) ?? ctx.req.headers[RpcHeader.authData];
            if (ciperText) {
                const plaintext = await this.m_Crypto.decrypt(ciperText as string);
                await session.initSession(
                    JSON.parse(plaintext)
                );
            } else if (!session.isOptionalSession) {
                throw ExpressSetSessionRequestHandler.errAuth;
            }
        } catch (ex) {
            ctx.err = ex;
        } finally {
            await this.next?.handle(ctx);
        }
    }
}