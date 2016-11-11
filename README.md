# modan

A minimalistic static site generator.

- Build static site from React component
- Automatic refresh
- Zero setup

## Usage

### Install

Install `modan`:

```bash
npm install modan --save-dev
```

then, add scripts to the `package.json` like this:

```json
{
  "scripts": {
    "build": "modan build",
    "serve": "modan serve"
  }
}
```

### Serve

`modan serve` starts a local preview server on [http://localhost:3000](http://localhost:3000).

Create `pages/index.js` that exports a React component:

```javascript
import React from "react";
export default () => <div>Hello</div>
```

and execute:

```bash
npm run serve
```

![image](/images/screenshot-serve.png)

### Build

`modan build` generates HTML files from `pages/*.js` into `docs/*.html`.

```bash
npm run build
```
