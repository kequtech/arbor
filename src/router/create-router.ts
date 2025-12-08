import { logger } from '../built-in/logger.ts';
import { Ex } from '../ex.ts';
import type { Branch, BranchData, Route, Router } from '../types.ts';
import { validateBranch } from '../utils/validate.ts';
import { cacheBranches, cacheRoutes } from './tools/cacher.ts';
import { createRegexp } from './tools/create-regexp.ts';
import { matchGroups } from './tools/extract.ts';

export function createRouter(structure: BranchData): Router {
    validateBranch(structure);

    const routes = cacheRoutes(structure);
    const branches = cacheBranches(structure);

    return function router(method: string, url: string) {
        const matchedRoutes = routes.filter((item) => item.regexp.test(url));
        const route = getRoute(matchedRoutes, method) ?? generate404(branches, url, method);
        const params = matchGroups(url, route.regexp);
        const methods = getMethods(matchedRoutes, route.autoHead);

        return [route, params, methods];
    };
}

function getRoute(routes: Route[], method: string): Route | undefined {
    const route = routes.find((item) => item.method === method);

    if (route === undefined && method === 'HEAD') {
        return routes.find((item) => item.autoHead && item.method === 'GET');
    }

    return route;
}

function generate404(branches: Branch[], key: string, method: string): Route {
    const branch: Branch = branches.find((item) => item.regexp.test(key)) ?? {
        regexp: createRegexp('/**'),
        actions: [],
        errorHandlers: [],
        renderers: [],
        autoHead: true,
        logger,
    };

    return {
        ...branch,
        method,
        actions: [
            ...branch.actions,
            () => {
                throw Ex.NotFound();
            },
        ],
    };
}

function getMethods(routes: Route[], autoHead: boolean): string[] {
    const set = new Set(routes.map((item) => item.method));

    if (autoHead && set.has('GET')) set.add('HEAD');

    return [...set];
}
