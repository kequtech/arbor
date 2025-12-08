import assert from 'node:assert/strict';
import { it } from 'node:test';
import { logger, silentLogger } from '../../src/built-in/logger.ts';

it('returns a logger', () => {
    assert.equal(typeof logger.error, 'function');
    assert.equal(typeof logger.warn, 'function');
    assert.equal(typeof logger.info, 'function');
});

it('returns a silent logger', () => {
    assert.equal(typeof silentLogger.error, 'function');
    assert.equal(typeof silentLogger.warn, 'function');
    assert.equal(typeof silentLogger.info, 'function');
});
