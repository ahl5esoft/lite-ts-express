import moment from 'moment';

import { ExpressOption } from './option';

export function portExpressOption(project: string, port: number, version: string): ExpressOption {
    return app => {
        const args: any[] = [port, () => {
            console.log(`express >> ${project}(v${version})[${moment().format('YYYY-MM-DD HH:mm:ss')}]: ${port}`);
        }];
        if (process.platform == 'win32')
            args.splice(1, 0, '127.0.0.1');
        return app.listen(...args);
    };
}