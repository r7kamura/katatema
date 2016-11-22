# katatema

[![npm](https://img.shields.io/npm/v/katatema.svg)](https://www.npmjs.com/package/katatema)
[![CircleCI](https://img.shields.io/circleci/project/github/r7kamura/katatema.svg)](https://circleci.com/gh/r7kamura/katatema)

A handy static site generator using React.js.

- Zero setup
- Auto refresh
- Sass support

![demo](/images/demo.gif)

## Usage

### Install

Install `katatema`:

```bash
npm install katatema --save
```

and add scripts to the `package.json` like this:

```json
{
  "scripts": {
    "build": "katatema build",
    "serve": "katatema serve"
  }
}
```

### Serve

Create `pages/index.js` that exports a React component:

```javascript
import React from "react";
export default () => <div>Hello</div>
```

and execute `katatema serve` to start a preview server on [http://localhost:3000](http://localhost:3000):

```bash
npm run serve
```

![image](/images/screenshot-serve.png)

### Build

Execute `katatema build` to generate HTML files from `pages/*.js` into `docs/*.html`.

```bash
npm run build
```

![image](/images/screenshot-build.png)

## FAQ

### How to insert elements into `<head>`?

Use `Head` component to change the content of `<head>` element.

```javascript
import Head from "katatema/head";
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

### How to use CSS?

Import `*.scss` file as a React component, then embed it.

```javascript
import React from "react";
import Style from "./main.scss";
export default () => (
  <div className="foo">
    <Style/>
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

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello world</title>
    <style>
      .foo {
        background-color: red;
      }

      .bar {
        color: white;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <div class="foo">
        <h1 class="bar">Hello world</h1>
      </div>
    </div>
  </body>
</html>
```

### How to deploy to GitHub Pages?

`gh-pages` command line utility helps you deploy your site to GitHub Pages.

```bash
npm install gh-pages --save-dev
```

Add scripts to the `package.json` like this:

```json
{
  "scripts": {
    "build": "katatema build",
    "serve": "katatema serve",
    "deploy": "npm run build && gh-pages --dist docs",
  }
}
```

then execute it to build your pages and deploy them to GitHub Pages.

```bash
npm run deploy
```

### What is this inspired by?

- [PHP](https://github.com/php/php-src)
- [next.js](https://github.com/zeit/next.js)
- [gatsuby](https://github.com/gatsbyjs/gatsby)
