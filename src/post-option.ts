import { CryptoBase } from 'lite-ts-crypto';

import { ApiFactoryBase } from './api-factory-base';
import { ExpressCallApiRequestHandler } from './call-api-request-handler';
import { ExpressGetApiRequestHandler } from './get-api-request-handler';
import { ExpressJsonResponseRequestHandler } from './json-response-request-handler';
import { routeExpressOption } from './route-option';
import { ExperssSetSessionRequestHandler } from './set-session-request-handler';

export function postExpressOption(
    apiFactory: ApiFactoryBase,
    authCrypto: CryptoBase,
    displayError: boolean,
) {
    return routeExpressOption(
        'post',
        '/:endpoint/:api',
        new ExpressGetApiRequestHandler(apiFactory, displayError),
        new ExperssSetSessionRequestHandler(authCrypto),
        new ExpressCallApiRequestHandler(),
        new ExpressJsonResponseRequestHandler(),
    );
}