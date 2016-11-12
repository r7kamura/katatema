import createWebpackCompiler from "./create-webpack-compiler";
import WebpackDevServer from "webpack-dev-server";

export default class WebpackServer {
  constructor({ port }) {
    this.port = port;
  }

  run() {
    return createWebpackCompiler({ hotReloadable: true }).then((webpackCompiler) => {
      return new WebpackDevServer(
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
    }).then((server) => {
      return new Promise((resolve, reject) => {
        server.listen(this.port, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    });
  }
}
