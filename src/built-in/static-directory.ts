import fs from 'node:fs';
import path from 'node:path';
import { Ex } from '../ex.ts';
import { createAction } from '../router/modules.ts';
import type { Action, Params, Pathname } from '../types.ts';
import { guessContentType } from '../utils/guess-content-type.ts';
import {
    validateArray,
    validateExists,
    validateObject,
    validatePathname,
} from '../utils/validate.ts';
import { sendFile } from './send-file.ts';

interface StaticDirectoryOptions {
    location: Pathname;
    index?: string[];
    contentTypes?: Params;
}

export function staticDirectory(options: StaticDirectoryOptions): Action {
    validateOptions(options);
    const root = getAbsolute(process.cwd(), options.location);

    return createAction(async ({ req, res, params }) => {
        const wild = params.wild ?? '';
        const location = await getLocation(root, options.location, wild, options.index);
        const contentType = guessContentType(location, options.contentTypes);
        await sendFile(req, res, location, contentType);
    });
}

function validateOptions(options: StaticDirectoryOptions): void {
    validateExists(options, 'Static directory options');
    validateObject(options, 'Static directory options');
    validateExists(options.location, 'Static directory options.location');
    validatePathname(options.location, 'Static directory options.location');
    validateArray(options.index, 'Static directory options.index', 'string');
    validateObject(options.contentTypes, 'Static directory options.contentTypes', 'string');
}

async function getLocation(
    root: string,
    location: string,
    wild: string,
    index: string[] = [],
): Promise<Pathname> {
    // Prevent traversal outside the static root
    const absolute = getAbsolute(root, wild);
    const relative = path.relative(root, absolute);

    if (relative.startsWith('..') || relative.includes('../')) {
        throw Ex.Forbidden('invalid path', { root, absolute });
    }

    try {
        const stats = await fs.promises.stat(absolute);
        if (stats.isDirectory() && index.length > 0) {
            const files = await fs.promises.readdir(absolute);
            for (const file of index) {
                if (files.includes(file)) {
                    const indexPath = path.join(location, relative, file) as Pathname;
                    return indexPath;
                }
            }
        }
        if (stats.isFile()) {
            const relFromCwd = path.relative(process.cwd(), absolute);
            return relFromCwd as Pathname;
        }
    } catch {
        // fall through to NotFound
    }

    throw Ex.NotFound(undefined, { absolute, index });
}

function getAbsolute(root: string, location: string): string {
    return path.resolve(root, location.replace(/^\/+/, ''));
}
