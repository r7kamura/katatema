# katatema

[![npm](https://img.shields.io/npm/v/katatema.svg)](https://www.npmjs.com/package/katatema)
[![CircleCI](https://img.shields.io/circleci/project/github/r7kamura/katatema.svg)](https://circleci.com/gh/r7kamura/katatema)

A handy static site generator using React.js.

- Minimal setup
- Intuitive templating
- Hot reloading
- SCSS support

## Usage

### Minimal setup

To start using it, run this inside a new directory:

```bash
npm install katatema --save
mkdir pages
```

Write `./pages/index.js` as your 1st page:

```javascript
import React from "react";
export default () => <div>Hello!</div>
```

Add a script to `package.json` like this:

```json
{
  "scripts": {
    "serve": "katatema serve"
  }
}
```

Run it and open the preview server on [http://localhost:3000](http://localhost:3000):

```bash
npm run serve
```

![image](/images/screenshot-serve.png)

That's all. No time-consuming configuration required. (e.g. .babelrc, webpack.config.js, gulpfile.js...)

### Intuitive templating

We build sites like it's 1990s, or like PHP in those good old days.
Files are translated into HTML pages by using the filesystem as an API.
Add a JavaScript file at `./pages/index.js` and it'll be converted to `./docs/index.html`.

```
./pages/index.js  ---converted--->  ./docs/index.html
./pages/about.js  ---converted--->  ./docs/about.html
./pages/usage.js  ---converted--->  ./docs/usage.html
```

To build HTML files, add a script to `package.json` like this:

```json
{
  "scripts": {
    "build": "katatema build"
  }
}
```

And then just run it.

```bash
npm run build
```

### Hot reloading

All pages will automatically refreshed without page reloading on the preview server.
This is powered by webpack's Hot Module Replacement feature in the background.
Dramatically speed development.

![demo](/images/demo.gif)

### SCSS support

We officially support [Sass](http://sass-lang.com/) to style pages.
Import `*.scss` file as a React component, then embed it.

```javascript
import React from "react";
import Style from "./main.scss";
export default () => (
  <div className="foo">
    <Style/>
    <h1 className="bar">Hello</h1>
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
<style>
  .foo {
    background-color: red;
  }
  .bar {
    color: white;
  }
</style>
<div class="foo">
  <h1 class="bar">Hello</h1>
</div>
```

## FAQ

<details>

<summary>How to deploy to GitHub Pages?</summary>

`gh-pages` command line utility helps you deploy your site to GitHub Pages.

```bash
npm install gh-pages --save-dev
```

When using `gh-pages`, your `package.json` looks like this:

```json
{
  "scripts": {
    "build": "katatema build",
    "serve": "katatema serve",
    "deploy": "npm run build && gh-pages --dist docs"
  }
}
```

Then you can simply invoke `npm run deploy` to deploy.

```
Cloning git@github.com:username/repo.git into node_modules/gh-pages/.cache
Cleaning
Fetching origin
Checking out origin/gh-pages
Removing files
Copying files
Adding all
Committing
Pushing
Published
```

</details>

<details>

<summary>What is this inspired by?</summary>

- [PHP](https://github.com/php/php-src)
- [next.js](https://github.com/zeit/next.js)
- [gatsuby](https://github.com/gatsbyjs/gatsby)
- [sitespec](https://github.com/r7kamura/sitespec)

</details>
