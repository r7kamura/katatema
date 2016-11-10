# modan

A static file generator built on top of the modern JavaScript stack.

- Build static site from React component
- Automatic code reloading
- Zero setup

## Usage

### Install

To start using it, install `modan` and create `pages` directory:

```bash
npm install modan --save-dev
mkdir pages
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

Populate `pages/index.js`:

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
