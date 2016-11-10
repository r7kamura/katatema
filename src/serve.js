import http from "http";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import WriteFilePlugin from "write-file-webpack-plugin"

const webpackCompiler = webpack({
  entry: {
    "about.js": "./pages/about.js",
    "index.js": "./pages/index.js",
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
    // libraryTarget: "commonjs2",
    path: `${process.cwd()}/.modan-cache`,
    // publicPath: "http://localhost:4000/",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new WriteFilePlugin({
      exitOnErrors: false,
      log: false,
      useHashIndex: false, // required not to cache removed files
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
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
