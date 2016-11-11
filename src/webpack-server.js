import createWebpackCompiler from "./create-webpack-compiler";
import WebpackDevServer from "webpack-dev-server";

export default class WebpackServer {
  constructor({ port }) {
    this.port = port;
    this.server = new WebpackDevServer(
      createWebpackCompiler(),
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
  }

  run() {
    return new Promise((resolve, reject) => {
      this.server.listen(this.port, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
