import createWebpackCompiler from "./create-webpack-compiler";
import fs from "fs";
import glob from "glob-promise";
import render from "./render";

export default function build() {
  return createWebpackCompiler({ hotReloadable: false }).then((webpackCompiler) => {
    return new Promise((resolve, reject) => {
      webpackCompiler.run((error, stats) => {
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
  }).then(() => {
    return glob("pages/**/*.js");
  }).then((paths) => {
    paths.forEach((path) => {
      const mod = require(`${process.cwd()}/.modan-cache/dist/${path}`);
      const Component = mod.default || mod;
      const html = render(Component);
      const htmlPath = path.replace("pages", "docs").replace(".js", ".html");
      console.log(`Building ${htmlPath}`);
      if (!fs.existsSync("./docs")) {
        fs.mkdirSync("./docs");
      }
      fs.writeFile(htmlPath, html);
    });
  });
}
