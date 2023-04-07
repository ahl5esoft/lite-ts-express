import { IApi } from './i-api';

export abstract class ApiFactoryBase {
    public abstract build(endpoint: string, apiName: string): Promise<IApi>;
}