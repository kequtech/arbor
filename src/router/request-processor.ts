import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Router } from '../types.ts';
import { renderError, renderRoute } from './actions.ts';
import { createBundle } from './create-bundle.ts';

export async function requestProcessor(
    router: Router,
    req: IncomingMessage,
    res: ServerResponse,
): Promise<void> {
    const startedAt = Date.now();
    const url = new URL(req.url || '/', `${req.headers.protocol}://${req.headers.host}`);
    const method = req.method || 'GET';
    const [route, params, methods] = router(method, url.pathname);
    const bundle = createBundle(req, res, params, methods);
    const { logger } = route;

    try {
        await renderRoute(route, bundle);
    } catch (error) {
        try {
            await renderError(route, bundle, error, logger);
        } catch (fatalError) {
            res.statusCode = 500;
            logger.error(fatalError);
        }
    }

    if (!res.writableEnded) {
        res.end();
    }

    logger.info(res.statusCode, Date.now() - startedAt, method, url.pathname + url.search);
}
