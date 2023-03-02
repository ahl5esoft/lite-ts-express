import { strictEqual } from 'assert';
import express from 'express';
import { opentracing } from 'jaeger-client';
import { Mock, mockAny } from 'lite-ts-mock';
import supertest from 'supertest';

import { IApi } from './i-api';
import { ICrypto } from './i-crypto';
import { ILogFactory, ILog } from './i-log-factory';
import { bodyParserJsonExpressOption } from './json-express-option';
import { expressPostOption as self } from './post-option';

describe('src/service/express/post-option.ts', () => {
    it('ok', async () => {
        const mockApi = new Mock<IApi>({
            initSession: () => { }
        });
        const mockCrypto = new Mock<ICrypto>();
        const mockLogFactory = new Mock<ILogFactory>();
        const app = express();

        bodyParserJsonExpressOption({})(app);

        self(mockCrypto.actual, mockLogFactory.actual, opentracing.globalTracer(), '/:route', async (_: any) => {
            return mockApi.actual;
        }, async () => {
            return {};
        })(app);

        const mockLog = new Mock<ILog>();
        mockLogFactory.expectReturn(
            r => r.build(),
            mockLog.actual
        );

        const route = '/test';
        mockLog.expectReturn(
            r => r.addLabel('route', route),
            mockLog.actual
        );

        mockLog.expectReturn(
            r => r.addLabel('body', {
                userID: 'uid'
            }),
            mockLog.actual
        );

        mockLog.expectReturn(
            r => r.addLabel('headers', mockAny),
            mockLog.actual
        );

        mockApi.expectReturn(
            r => r.call(),
            'ok'
        );

        mockLog.expectReturn(
            r => r.addLabel('response', {
                data: 'ok',
                err: 0,
            }),
            mockLog.actual
        );

        mockLog.expected.info();

        const res = await new Promise<string>(s => {
            supertest(app).post(route).set('Content-Type', 'application/json').send(
                JSON.stringify({
                    userID: 'uid'
                })
            ).end((err, resp) => {
                s(err ? '' : resp.text);
            });
        });
        strictEqual(res, `{"data":"ok","err":0}`);
    });
});