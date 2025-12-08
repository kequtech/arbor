import { createBundle } from '../router/create-bundle.ts';
import type { TestBundleOptions } from '../types.ts';
import { FakeReq, FakeRes } from '../utils/fake-http.ts';

export function createTestBundle(options: TestBundleOptions = {}) {
    const req = new FakeReq(options);
    const res = new FakeRes();
    const params = options.params ?? {};
    const methods = [options.method ?? 'GET'];
    const context = options.context;
    return createBundle(req, res, params, methods, context);
}
