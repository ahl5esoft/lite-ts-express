import { opentracing } from 'jaeger-client';

import { ExpressRequestHandlerBase } from './request-handler-base';
import { RequestHandlerContext } from './request-handler-context';

export class ExpressInitTracerRequestHandler extends ExpressRequestHandlerBase {
    private m_Tracer = opentracing.globalTracer();

    public async handle(ctx: RequestHandlerContext) {
        ctx.tracerSpan = this.m_Tracer.startSpan(ctx.req.path, {
            childOf: this.m_Tracer.extract(opentracing.FORMAT_HTTP_HEADERS, ctx.req.headers),
            tags: {
                [opentracing.Tags.SPAN_KIND]: opentracing.Tags.SPAN_KIND_RPC_SERVER,
                [opentracing.Tags.HTTP_METHOD]: ctx.req.method,
            }
        });
        await this.next?.handle(ctx);
    }
}