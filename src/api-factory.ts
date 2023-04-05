import { CustomError, ErrorCode } from 'lite-ts-error';
import { IDirectory } from 'lite-ts-fs';
import Container from 'typedi';

import { ApiFactoryBase } from './api-factory-base';
import { IApi } from './i-api';

const invalidAPIError = new CustomError(ErrorCode.api);
const invalidAPI: IApi = {
    call() {
        throw invalidAPIError;
    },
};

export class ExpressApiFactory extends ApiFactoryBase {
    private m_ApiCtor: Promise<{
        [endpoint: string]: {
            [api: string]: Function;
        };
    }>;
    protected get apiCtors() {
        this.m_ApiCtor ??= new Promise<{
            [endpoint: string]: {
                [api: string]: Function;
            };
        }>(async (s, f) => {
            try {
                let apiCtors = {};
                const dirs = await this.m_Dir.findDirectories();
                for (const r of dirs) {
                    const files = await r.findFiles();
                    apiCtors[r.name] = files.reduce((memo: { [key: string]: Function; }, cr) => {
                        if (cr.name.includes('_it') || cr.name.includes('_test') || cr.name.includes('.d.ts'))
                            return memo;

                        const api = require(cr.path);
                        if (!api.default)
                            throw new Error(`未导出default: ${cr.path}`);

                        const name = cr.name.split('.')[0];
                        memo[name] = api.default;
                        return memo;
                    }, {});
                }
                s(apiCtors);
            } catch (ex) {
                f(ex);
            }
        });
        return this.m_ApiCtor;
    }

    public constructor(
        private m_Dir: IDirectory,
    ) {
        super();
    }

    public async build(endpoint: string, apiName: string) {
        const endpointApiCtor = await this.apiCtors;
        const apiCtor = endpointApiCtor[endpoint]?.[apiName];
        if (!apiCtor)
            return invalidAPI;

        const api = Container.get<IApi>(apiCtor);
        Container.remove(apiCtor);
        return api;
    }
}