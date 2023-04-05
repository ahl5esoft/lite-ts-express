import { notStrictEqual } from 'assert';
import { IDirectory } from 'lite-ts-fs';
import { Mock } from 'lite-ts-mock';

import { ExpressApiFactory as Self } from './api-factory';

describe('src/api-factory.ts', () => {
    describe('.build(endpoint: string, apiName: string)', () => {
        it('不存在', async () => {
            const mockDir = new Mock<IDirectory>();
            const self = new Self(mockDir.actual);

            mockDir.expectReturn(
                r => r.findDirectories(),
                []
            );

            const res = await self.build('endpoint', 'api');
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