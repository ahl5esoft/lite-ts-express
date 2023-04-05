import cors from 'cors';

import { ExpressOption } from './option';

export function corsExpressOption(option: cors.CorsOptions): ExpressOption {
    return app => {
        app.use(
            cors(option)
        );
    }
}