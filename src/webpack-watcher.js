import createWebpackCompiler from "./create-webpack-compiler";

export default class WebpackWatcher {
  run() {
    return createWebpackCompiler({ hotReloadable: false }).then((webpackCompiler) => {
      return new Promise((resolve, reject) => {
        webpackCompiler.watch({}, (error, stats) => {
          if (error) {
            reject(error);
          } else {
            const jsonStats = stats.toJson();
            if (jsonStats.errors.length > 0) {
              const error = new Error(jsonStats.errors[0]);
              error.errors = jsonStats.errors;
              error.warnings = jsonStats.warnings;
              return reject(error);
            }
            resolve(stats);
          }
        });
      });
    });
  }
}
