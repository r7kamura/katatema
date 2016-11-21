import createWebpackCompiler from "./create-webpack-compiler";
import fs from "fs-extra";
import glob from "glob-promise";
import render from "./render";

export default function build() {
  return createWebpackCompiler({ hotReloadable: false, isServer: true }).then((webpackCompiler) => {
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
      const htmlPath = path.replace("pages", "docs").replace(".js", ".html");
      console.log(`Building ${htmlPath}`);
      const html = render(path, { hotReloadable: false });
      if (!fs.existsSync("docs")) {
        fs.mkdirSync("docs");
      }
      fs.writeFile(htmlPath, html);
    });
    if (!fs.existsSync("docs/javascripts")) {
      fs.mkdirSync("docs/javascripts");
    }
    fs.copySync(`${__dirname}/client/modan-client.js`, "docs/javascripts/modan-client.js");
  });
}
