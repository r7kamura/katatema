# modan

A minimalistic static site generator.

- Build HTML files from React component
- Zero setup by running Webpack in the background
- Automatic refresh by Hot Module Replacement

## Usage

### Install

Install `modan`:

```bash
npm install modan --save-dev
```

and add scripts to the `package.json` like this:

```json
{
  "scripts": {
    "build": "modan build",
    "serve": "modan serve"
  }
}
```

### Serve

Create `pages/index.js` that exports a React component:

```javascript
import React from "react";
export default () => <div>Hello</div>
```

and execute `modan serve` to start a preview server on [http://localhost:3000](http://localhost:3000):

```bash
npm run serve
```

![image](/images/screenshot-serve.png)

### Build

Execute `modan build` to generate HTML files from `pages/*.js` into `docs/*.html`.

```bash
npm run build
```

![image](/images/screenshot-build.png)

## FAQ

### How to add elements into `<head>` element?

Use `Head` component to change the content of `<head>` element.

```javascript
import Head from "modan/head";
import React from "react";
export default () => (
  <div>
    <Head>
      <meta charset="utf-8">
      <title>Hello world</title>
    </Head>
    <h1>Hello world</h1>
  </div>
)
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello world</title>
  </head>
  <body>
    <div id="container">
      Hello world
    </div>
  </body>
</html>
```

### How to add CSS?

Import `*.scss` file as a React component and embed it into `<Head>` element.

```javascript
import Head from "modan/head";
import React from "react";
import Style from "./main.scss";
export default () => (
  <div className="foo">
    <Head>
      <Style/>
    </Head>
    <h1 className="bar">Hello world</h1>
  </div>
)
```

```scss
.foo {
  background-color: red;
}

.bar {
  color: white;
}
```
