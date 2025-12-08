import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Ex, createTestBundle } from '../../../src/index.ts';
import { errorHandler } from '../../../src/router/handlers/error-handler.ts';

type Result = { error: any };

describe('errorHandler', () => {
    it('sets Content-Type to application/json when missing', () => {
        const ex = Ex.InternalServerError();
        const bundle = createTestBundle();

        const { error } = errorHandler.action(ex, bundle) as Result;

        assert.equal(bundle.res.getHeader('Content-Type'), 'application/json');
        assert.deepEqual(error.statusCode, 500);
        assert.equal(error.message, 'Internal Server Error');
    });

    it('overwrites existing application/json Content-Type', () => {
        const ex = Ex.InternalServerError();
        const bundle = createTestBundle();
        bundle.res.setHeader('Content-Type', 'application/json; charset=utf-8');

        const { error } = errorHandler.action(ex, bundle) as Result;

        assert.equal(bundle.res.getHeader('Content-Type'), 'application/json');
        assert.equal(error.statusCode, 500);
    });

    it('splits stack into lines', () => {
        const ex = Ex.InternalServerError();
        ex.stack = 'a\nb\nc';
        const bundle = createTestBundle();

        const { error } = errorHandler.action(ex, bundle) as Result;

        assert.deepEqual(error.stack, ['a', 'b', 'c']);
    });
});
