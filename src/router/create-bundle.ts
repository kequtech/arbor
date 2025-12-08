import type { IncomingMessage, ServerResponse } from 'node:http';
import { createGetBody } from '../body/create-get-body.ts';
import type { Bundle, BundleContext } from '../types.ts';
import type { FakeReq, FakeRes } from '../utils/fake-http.ts';
import { createCookies } from './create-cookies.ts';

export function createBundle(
    req: IncomingMessage | FakeReq,
    res: ServerResponse | FakeRes,
    params: Record<string, string>,
    methods: string[],
    context: BundleContext = {},
): Bundle {
    const url = new URL(req.url || '/', `${req.headers.protocol}://${req.headers.host}`);
    return Object.freeze({
        req: req as IncomingMessage,
        res: res as ServerResponse,
        url,
        context,
        params,
        methods,
        cookies: createCookies(req, res),
        getBody: createGetBody(req),
    });
}
