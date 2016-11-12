import createWebpackCompiler from "./create-webpack-compiler";
import fs from "fs";
import glob from "glob-promise";
import render from "./render";

const webpackCompiler = createWebpackCompiler();

export default function build() {
  return new Promise((resolve, reject) => {
    webpackCompiler.run((error, stats) => {
      if (error) {
        reject(error)
      } else {
        resolve(stats);
      }
    });
  }).then(() => {
    return glob("./pages/**/*.js");
  }).then((paths) => {
    paths.forEach((path) => {
      const mod = require(`${process.cwd()}/.modan-cache/babel-compiled/${path.replace("./pages/", "")}`);
      const Component = mod.default || mod;
      const html = render(Component);
      const htmlPath = path.replace("./pages", "./docs").replace(".js", ".html");
      console.log(`Building ${htmlPath}`);
      fs.writeFile(htmlPath, html);
    });
  });
}
