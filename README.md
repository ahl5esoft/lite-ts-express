# ![Version](https://img.shields.io/badge/version-1.2.1-green.svg)

## 安装

```
npm install lite-ts-express
```

## 使用

```typescript
import { ExpressApiPort, corsExpressOption, bodyParserJsonExpressOption, expressGetOption, expressPortOption } from 'lite-ts-express';

(async () => {
    await new ExpressApiPort([
        corsExpressOption({}),
        bodyParserJsonExpressOption({
            limit: '16mb'
        }),
        expressGetOption({
            name: 'lite-ts-express',
            version: '1.0.0'
        }),
        expressPortOption('lite-ts-express', 10000, '1.0.0'),
    ]).listen().catch(console.error);
})();
```
