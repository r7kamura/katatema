import createWebpackCompiler from "./create-webpack-compiler";
import http from "http";
import React from "react";
import ReactDOMServer from "react-dom/server";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import WriteFilePlugin from "write-file-webpack-plugin"

const webpackCompiler = createWebpackCompiler();

const webpackDevServer = new WebpackDevServer(
  webpackCompiler,
  {
    clientLogLevel: "warning",
    hot: true,
    noInfo: true,
    publicPath: "/",
    stats: {
      assets: false,
      children: false,
      chunks: false,
      color: false,
      errors: true,
      errorDetails: false,
      hash: false,
      modules: false,
      publicPath: false,
      reasons: false,
      source: false,
      timings: false,
      version: false,
      warnings: false,
    },
  }
);

const httpServer = http.createServer((request, response) => {
  new Promise((resolve) => {
    let path = request.url;
    if (path.endsWith("/")) {
      path += "index";
    }
    const mod = require(`${process.cwd()}/.modan-cache/babel-compiled${path}.js`);
    const Component = mod.default || mod;
    const html = ReactDOMServer.renderToString(<Component/>);
    response.setHeader("Content-Type", "text/html");
    response.setHeader("Content-Length", Buffer.byteLength(html));
    response.end(html);
    resolve();
  }).catch((error) => {
    console.error(error);
    resopnse.status(500);
    response.end("Error");
  });
});

export default function serve() {
  return new Promise((resolve, reject) => {
    webpackDevServer.listen(4000, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log("Webpack dev server started on http://localhost:4000");
        resolve();
      }
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      httpServer.listen(3000, (error) => {
        if (error) {
          reject(error);
        } else {
          console.log("HTTP server started on http://localhost:3000");
          resolve();
        }
      });
    });
  });
}
