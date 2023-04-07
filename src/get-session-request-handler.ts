import { CryptoBase } from 'lite-ts-crypto';
import { CustomError, ErrorCode } from 'lite-ts-error';
import { Header, RpcBase } from 'lite-ts-rpc';

import { ExpressRequestHandlerBase } from './request-handler-base';
import { RequestHandlerContext } from './request-handler-context';
import { SessionData } from './session-data';

export class ExpressGetSessionRequestHandler extends ExpressRequestHandlerBase {
    public constructor(
        private m_Crypto: CryptoBase,
        private m_Rpc: RpcBase,
        private m_Route: string = '/account/get-session-data',
        private m_BodyField: { [key: string]: string } = {
            bg: 'adminToken',
            mh: 'userToken'
        },
    ) {
        super();
    }

    public async handle(ctx: RequestHandlerContext) {
        try {
            if (ctx.err)
                return;

            const token = ctx.req.get(Header.authToken);
            if (!token)
                return;

            const endpoint = ctx.req.path.split('/')[2];
            const bodyField = this.m_BodyField[endpoint];
            if (!bodyField)
                throw new CustomError(ErrorCode.warning, `缺少认证参数: ${endpoint}`);

            const resp = await this.m_Rpc.call<SessionData>({
                body: {
                    [bodyField]: token
                },
                isThrow: true,
                route: this.m_Route,
            });
            ctx.req.headers[Header.authData] = await this.m_Crypto.encrypt(
                JSON.stringify(resp.data)
            );
            delete ctx.req.headers[Header.authToken];
        } catch (ex) {
            ctx.err = ex;
        } finally {
            await this.next?.handle(ctx);
        }
    }
}