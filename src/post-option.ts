import { CryptoBase } from 'lite-ts-crypto';

import { ApiFactoryBase } from './api-factory-base';
import { ExpressCallApiRequestHandler } from './call-api-request-handler';
import { ExpressGetApiRequestHandler } from './get-api-request-handler';
import { ExpressResponseRequestHandler } from './response-request-handler';
import { routeExpressOption } from './route-option';
import { ExpressSetSessionRequestHandler } from './set-session-request-handler';

export function postExpressOption(
    apiFactory: ApiFactoryBase,
    authCrypto: CryptoBase,
    displayError: boolean,
) {
    return routeExpressOption(
        'post',
        '/:endpoint/:api',
        new ExpressGetApiRequestHandler(apiFactory, displayError),
        new ExpressSetSessionRequestHandler(authCrypto),
        new ExpressCallApiRequestHandler(),
        new ExpressResponseRequestHandler(),
    );
}