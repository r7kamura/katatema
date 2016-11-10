import fs from "fs";
import glob from "glob-promise";
import React from "react";
import ReactDOM from "react-dom/server";
import webpack from "webpack";

export default () => {
  return glob("./pages/**/*.js").then((paths) => {
    const entry = {};
    paths.forEach((path) => {
      entry[path.replace("./pages", "")] = path;
    });
    return new Promise((resolve, reject) => {
      webpack({
        entry,
        module: {
          loaders: [
            {
              test: /\.jsx?$/,
              loader: "babel-loader",
              exclude: /node_modules/,
            },
          ],
        },
        output: {
          filename: "[name]",
          path: "./compiled",
        },
        resolve: {
          extensions: [
            "",
            ".js",
            ".jsx",
          ],
        },
      }).run((error, stats) => {
        if (error) {
          reject(error)
        } else {
          resolve(stats);
        }
      });
    });
  }).then(() => {
    return glob("./compiled/**/*.js");
  }).then((paths) => {
    const table = paths.reduce((result, path) => {
      result[path] = require(`${process.cwd()}/${path}`);
      console.log(result[path]);
      return result;
    }, {});
    Object.keys(table).map((path) => {
      const Component = table[path];
      const htmlPath = path.replace("./compiled/", "./docs/").replace(".js", ".html");
      const html = ReactDOM.renderToString(<Component/>);
      console.log(`Building ${htmlPath}`);
      fs.writeFile(htmlPath, html);
    });
  }).catch((error) => {
    console.log(error);
  });
}
