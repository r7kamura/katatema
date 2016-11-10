# modan

A static file generator built on top of React, Webpack, and Babel.

## Usage

To start using it, install it and create `pages` directory:

```bash
npm install modan --save-dev
mkdir pages
```

Populate `pages/index.js`, which is used to build `docs/index.html`:

```javascript
import React from "react";
export default () => <div>Hello world!</div>
```

Add a script to the `package.json` like this:

```json
{
  "scripts": {
    "serve": "modan serve"
  }
}
```

and run:

```bash
npm run serve
```
