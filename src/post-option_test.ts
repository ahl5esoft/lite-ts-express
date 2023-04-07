import { strictEqual } from 'assert';
import { Length } from 'class-validator';
import express from 'express';
import { Mock } from 'lite-ts-mock';
import supertest from 'supertest';

import { ApiFactoryBase } from './api-factory-base';
import { bodyParserJsonExpressOption } from './body-parser-option';
import { IApi } from './i-api';
import { postExpressOption as self } from './post-option';

class TestApi implements IApi {
    @Length(1)
    public name: string;

    public async call() {
        return 'hello:' + this.name;
    }
}

describe('src/post-option.ts', () => {
    it('ok', async () => {
        const app = express();
        bodyParserJsonExpressOption({})(app);

        const mockApiFactory = new Mock<ApiFactoryBase>();
        self(mockApiFactory.actual, null, false)(app);

        const api = new TestApi();
        mockApiFactory.expectReturn(
            r => r.build('aa', 'bb'),
            api
        );

        const res = await new Promise<string>(s => {
            supertest(app).post('/aa/bb').set('Content-Type', 'application/json').send(
                JSON.stringify({
                    name: 'test'
                })
            ).end((err, resp) => {
                s(err ? '' : resp.text);
            });
        });
        strictEqual(res, `{"data":"hello:test","err":0}`);
    });
});