import { json, OptionsJson, OptionsUrlencoded, urlencoded } from 'body-parser';

import { ExpressOption } from './option';

export function bodyParserFormExpressOption(option: OptionsUrlencoded): ExpressOption {
    return app => {
        app.use(
            urlencoded(option)
        );
    };
}

export function bodyParserJsonExpressOption(option: OptionsJson): ExpressOption {
    return app => {
        app.use(
            json(option)
        );
    };
}