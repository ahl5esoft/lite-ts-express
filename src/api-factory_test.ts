import { notStrictEqual } from 'assert';
import { IDirectory } from 'lite-ts-fs';
import { Mock } from 'lite-ts-mock';

import { createApiFactory } from './api-factory';

describe('src/api-factory.ts', () => {
    describe('.build(endpoint: string, apiName: string)', () => {
        it('不存在', async () => {
            const mockDir = new Mock<IDirectory>();

            mockDir.expectReturn(
                r => r.findDirectories(),
                []
            );

            const self = await createApiFactory(mockDir.actual);
            const res = self.build('endpoint', 'api');
            let err: Error;
            try {
                await res.call();
            } catch (e) {
                err = e;
            }
            notStrictEqual(err, undefined);
        });
    });
});