import assert from 'node:assert/strict';
import { it } from 'node:test';
import { Ex } from '../src/ex.ts';

it('exports a few common errors', () => {
    const keys: (keyof typeof Ex)[] = ['Unauthorized', 'NotFound', 'BadRequest'];

    for (const key of keys) {
        assert.equal(typeof Ex[key], 'function');
    }
});

it('can create an error', () => {
    const result = Ex.BadGateway('test message', { test: 'more info', cause: 'hello' });

    assert.equal(result.message, 'test message');
    assert.equal(result.name, 'BadGateway');
    assert.equal(result.statusCode, 502);
    assert.equal(result.cause, 'hello');
    assert.deepEqual(result.info, { test: 'more info' });
    assert.ok(result instanceof Error);
});

it('allows creation of custom errors', () => {
    const result = Ex.StatusCode(1001, 'test message', { test: 'more info', cause: 'hello' });

    assert.equal(result.message, 'test message');
    assert.equal(result.name, 'Error');
    assert.equal(result.statusCode, 1001);
    assert.equal(result.cause, 'hello');
    assert.deepEqual(result.info, { test: 'more info' });
    assert.ok(result instanceof Error);
});

it('allows creation of custom known errors', () => {
    const result = Ex.StatusCode(404, 'test message', { test: 'more info', cause: 'hello' });

    assert.equal(result.message, 'test message');
    assert.equal(result.name, 'NotFound');
    assert.equal(result.statusCode, 404);
    assert.equal(result.cause, 'hello');
    assert.deepEqual(result.info, { test: 'more info' });
    assert.ok(result instanceof Error);
});

it('normalizes Error cause into an object', () => {
    const ex = Ex.InternalServerError(undefined, { cause: new Error('details') });

    assert.deepEqual(ex.cause, {
        name: 'Error',
        message: 'details',
        cause: undefined,
    });
});

it('normalized cause and info fields', () => {
    const ex = Ex.InternalServerError(undefined, {
        cause: 123n,
        bigint: 10n,
        err: new Error('oops'),
        plain: 42,
    });

    assert.ok(ex.info);
    assert.equal(ex.info.cause, undefined);
    assert.equal(ex.info.bigint, '10');
    assert.deepEqual(ex.info.err, {
        name: 'Error',
        message: 'oops',
        cause: undefined,
    });
    assert.equal(ex.info.plain, 42);
    assert.equal(ex.cause, '123');
});
