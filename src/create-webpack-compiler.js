import { resolve } from "path";
import glob from "glob-promise";
import webpack from "webpack";
import WriteFilePlugin from "write-file-webpack-plugin"

function getEntryAsync({ currentWorkingDirectory, hotReloadable }) {
  return glob("pages/**/*.js", { cwd: currentWorkingDirectory }).then((pagePaths) => {
    return pagePaths.reduce((result, pagePath) => {
      result[`bundles/${pagePath}`] = [`./${pagePath}`];
      if (hotReloadable) {
        result[`bundles/${pagePath}`].unshift("webpack/hot/dev-server");
      }
      return result;
    }, {});
  });
}

function getPlugins({ hotReloadable }) {
  const plugins = [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new WriteFilePlugin({
      exitOnErrors: false,
      log: false,
      useHashIndex: false, // required not to cache removed files
    }),
  ];
  if (hotReloadable) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  return plugins;
}

export default function createWebpackCompiler({ hotReloadable }) {
  const currentWorkingDirectory = resolve(".");
  return getEntryAsync({ currentWorkingDirectory, hotReloadable }).then((entry) => {
    return webpack({
      entry,
      context: currentWorkingDirectory,
      module: {
        loaders: [
          {
            exclude: /node_modules/,
            include: [currentWorkingDirectory],
            loader: "file",
            query: {
              name: "dist/[path][name].[ext]"
            },
            test: /\.js$/,
          },
          {
            exclude: /node_modules/,
            loader: "babel",
            query: {
              presets: [
                "es2015",
                "react",
              ],
            },
          }
        ],
      },
      output: {
        filename: "[name]",
        libraryTarget: "commonjs2",
        path: `${currentWorkingDirectory}/.modan-cache`,
        publicPath: hotReloadable ? "http://localhost:4000/" : null,
      },
      plugins: getPlugins({ hotReloadable }),
      resolve: {
        extensions: [
          "",
          ".js",
          ".jsx",
          ".scss",
        ],
        root: [
          `${__dirname}/../../node_modules`,
          `${currentWorkingDirectory}/node_modules`,
        ],
      },
      resolveLoader: {
        root: [
          `${__dirname}/../../node_modules`,
        ]
      },
    });
  });
}
