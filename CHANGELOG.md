# Changelog

Pre‑1.0: minor versions may include breaking changes.

# 0.14.0 - 2025-12-08

**Breaking** Entire project has been moved and renamed. This package is now `@kequtech/arbor` not `kequapp` on npm. All imports will need to be updated. The repository itself has also been moved to `@kequtech/arbor` on GitHub.

**Security** Possible exploit in static-directory addressed that could allow path traversal attacks. Static files are now served with stricter rules. Likely was not an issue in most deployments, there has been no report of it, but patched for safety and out of an abundance of caution.

**Security** Errors used as `cause` on errors (`Ex.NotFound(undefined, { cause: new Error() });`) have stack trace removed. Reducing the chance that it is accidentally sent to a client. You can cause: cause: cause: all the way down they'll contain `message`, `name`, `cause`. This is true for all errors placed anywhere within a `ServerEx`.

**Added** New `createTestBundle` method to create a testable instance of an arbor bundle. This enables easier direct unit testing of actions.

**Added** New DOCUMENTATION hallelujah! https://docs.kequtech.com/arbor/

**Changed** Internal refactoring and code cleanup.

**Changed** New build configuration, should not affect anybody, worth mentioning that it has changed. Still only targeting esm and modern node as before (>=20.0.0).

**Planned** More documentation updates as I read through it looking for ways to improve what's there. Currently suffering from increased interest in feedback about documentation.

## 0.13.0 - 2025-11-22

**Breaking:** Types have been renamed dropping `T` and `I` prefixes. Any imported types from the library have to be updated.

**Breaking:** `getBody` has changed the format of the `validate` attribute. Instead of one function it is an object with a separate validator for each parameter. Any existing use of `validate` will need to be updated. In this way the library knows which parameter has an issue and doesn't have to validate everything when unnecessary.

**Added:** `getBody` now accepts a `throws` attribute. When `false`, validation errors are returned as part of the result object instead of throwing an exception. You will need to check the result of `body.ok`, if `false` handle the `body.errors` object. Only if `body.ok` can you interact with the rest of `body` normally. This functionality was added for cases where you need to know which fields caused validation to fail.

```ts
{
    ok: false,
    errors: {
        name: 'is required',
    },
}
```

**Changed:** Mainly internal refactoring and tests.

**Planned:** The documentation is out of date, should be updated to reflect changes since 0.10.0. Possible makeover?

## 0.12.0 - 2025-11-20

**Added:** `getBody` now accepts a `trim` attribute. When `true`, leading and trailing whitespace is removed from all string body values. In addition to trimming strings, it also removes empty strings. Thus `required` fields are not allowed to be empty strings, `array` fields will not contain empty strings, and so on.

## 0.11.0 - 2025-11-09

**Added:** `cookies` helper now supports the `domain` attribute.

**Changed:** Applying the `logger` parameter in your tree only affects which logger arbor uses internally. It no longer injects the logger into your code. Methods for `error` `warn` and `info` are the only methods used by arbor.

**Removed:** `logger` parameter removed from bundle. Use `import { logger } from '<your logger>'` to get a logger instance in any file.

## 0.10.0 - 2025-10-05

**Breaking:** `Ex.<ErrorName>()` methods no longer accept 3+ parameters. Second parameter is `options` and it is a `Record<string, unknown>`.

**Changed:** Magic keyword `cause` added to `Ex` options. It is removed from the private developer attribute `error.info`, and sent to the client as `error.cause` when used. Attribute `error.info` still contains the other options and still remains developer only.

## 0.9.0 – 2025-07-18

**Breaking:** ESM‑only distribution (no CommonJS). Use `import { createApp } from '@kequtech/arbor'` or `await import()` from CJS.

**Changed:** Package `exports` now only expose ESM entry. Tests updated to use native node test runner and libraries.

**Removed:** `require()` support.

## 0.8.0 – 2024-06-07

**Breaking:** `handle(s)` renamed to `action(s)`; `createHandle` → `createAction`.

**Changed:** Docs and examples updated to reflect terminology.
