import { deepStrictEqual } from 'assert';
import { Length } from 'class-validator';
import { Mock } from 'lite-ts-mock';

import { ApiFactoryBase } from './api-factory-base';
import { ExpressGetApiRequestHandler as Self } from './get-api-request-handler';
import { IApi } from './i-api';
import { ExpressRequestHandlerBase } from './request-handler-base';
import { Route } from './route';

class TestApi implements IApi {
    @Length(1)
    public name: string;

    public async call() {
        return 'hw' + this.name;
    }
}

describe('src/get-api-request-handler.ts', () => {
    describe('.handle(ctx: RequestHandlerContext)', () => {
        it('ok', async () => {
            const mockApiFactory = new Mock<ApiFactoryBase>();
            const self = new Self(mockApiFactory.actual, true);

            mockApiFactory.expectReturn(
                r => r.build('ep', 'ap'),
                new TestApi()
            );

            const mockHandler = new Mock<ExpressRequestHandlerBase>();
            self.setNext(mockHandler.actual);

            const ctx = {
                apiResp: {},
                req: {
                    body: {
                        name: 'tt'
                    },
                    params: {
                        api: 'ap',
                        endpoint: 'ep',
                    } as Route
                }
            } as any;
            mockHandler.expected.handle(ctx);

            await self.handle(ctx);

            deepStrictEqual(ctx.api.name, 'tt');
        });
    });
}); 