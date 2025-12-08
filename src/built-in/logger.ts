import type { Logger } from '../types.ts';

const noop = (): void => {};

export const silentLogger: Logger = {
    error: noop,
    warn: noop,
    info: noop,
};

export const logger: Logger = {
    error: console.error,
    warn: console.warn,
    info: console.info,
};
