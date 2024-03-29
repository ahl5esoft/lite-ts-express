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
    const handler = new ExpressGetApiRequestHandler(apiFactory, displayError);
    handler.setNext(
        new ExpressSetSessionRequestHandler(authCrypto),
    ).setNext(
        new ExpressCallApiRequestHandler(),
    ).setNext(
        new ExpressResponseRequestHandler(),
    );
    return routeExpressOption('post', '/:endpoint/:api', handler);
}