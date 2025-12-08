<img alt="Arbor" src="https://github.com/kequtech/arbor/blob/main/arbor-logo-600.png?raw=true" width="300" />

# Arbor

**A minimal, modular Node.js framework for building fast, predictable web applications.**

[![npm version](https://img.shields.io/npm/v/%40kequtech/arbor?color=2e7dd7)](https://www.npmjs.com/package/@kequtech/arbor)
[![Node Version](https://img.shields.io/node/v/%40kequtech/arbor?color=2e7dd7)](#installation)
[![License](https://img.shields.io/npm/l/%40kequtech/arbor?color=2e7dd7)](./LICENSE)

Arbor gives you explicit control over your application: no hidden behaviors, no heavy abstractions and no configuration files posing as code.  
Branches shape your URL space, routes define entry points and actions execute your logic in a simple, predictable chain. If you understand the request bundle and the flow of actions, you understand Arbor.

---

## Installation

```bash
npm i @kequtech/arbor
````

Requires **Node 20+**.

---

## Quick Start

A minimal Arbor app:

```ts
import { createApp, createRoute } from "@kequtech/arbor";

const routeHello = createRoute({
  method: "GET",
  url: "/",
  actions: [
    () => "Hello, Arbor!",
  ],
});

export default createApp({
  routes: [routeHello],
});
```

Run with any HTTP server that can accept a Node request listener:

```ts
import { createServer } from "node:http";
import app from "./app";

createServer(app).listen(3000);
```

Open:
`http://localhost:3000` → **Hello, Arbor!**

---

## Documentation

Full documentation is available at:

**[https://docs.kequtech.com/arbor](https://docs.kequtech.com/arbor)**

It includes:

* Core concepts (branches, routes, actions, body parsing, renderers, errors)
* Guides for authentication, validation, testing and project structure
* Detailed specifications for `getBody`, `Ex`, `staticDirectory`, `sendFile` and more

---

## Philosophy

Arbor is intentionally small:

* No magic
* No global configuration layers
* No hidden middleware chains
* No nested abstractions you must memorize

Everything is explicit, composable and easy to trace.

---

## Contributing

Issues and pull requests are welcome. Arbor evolves pragmatically and contributions that preserve its clarity and simplicity are especially appreciated.

---

## License

MIT © Kequtech Innovations Kft.
