import http from "http";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

const webpackCompiler = webpack({
  entry: {
    "index": "./pages/index.js",
  },
  module: {
    loaders: [
      {
        loader: "babel",
      }
    ],
  },
  output: {
    filename: "[name]",
    libraryTarget: 'commonjs2',
    path: `${process.cwd()}/modan-cache`,
    publicPath: "http://localhost:4000/",
  },
  resolve: {
    extensions: [
      "",
      ".js",
      ".jsx",
      ".scss",
    ],
    root: [
      "./node_modules",
    ],
  },
});

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
    const html = "Hello";
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

export default () => {
  return new Promise((resolve, reject) => {
    webpackDevServer.listen(4000, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      httpServer.listen(3000, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });
}
