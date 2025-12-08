import assert from 'node:assert/strict';
import { it } from 'node:test';
import { inject } from '../../src/built-in/inject.ts';
import { silentLogger } from '../../src/built-in/logger.ts';
import { createApp, createRoute } from '../../src/router/modules.ts';

it('can return a response from the app', async () => {
    const route = createRoute({
        method: 'GET',
        actions: [() => 'hello'],
    });
    const app = createApp({
        routes: [route],
        logger: silentLogger,
    });
    const { getResponse } = inject(app, {
        method: 'GET',
        url: '/',
    });

    const result = await getResponse();

    assert.equal(result, 'hello');
});
