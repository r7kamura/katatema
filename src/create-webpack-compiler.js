import { resolve } from "path";
import glob from "glob-promise";
import webpack from "webpack";
import WriteFilePlugin from "write-file-webpack-plugin";

function getEntryAsync({ currentWorkingDirectory, hotReloadable, isServer }) {
  const directoryName = isServer ? "server-bundles" : "client-bundles";
  return glob("pages/**/*.js", { cwd: currentWorkingDirectory }).then((pagePaths) => {
    return pagePaths.reduce((result, pagePath) => {
      result[`${directoryName}/${pagePath}`] = [`./${pagePath}`];
      if (hotReloadable) {
        result[`${directoryName}/${pagePath}`].unshift("webpack/hot/dev-server");
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

export default function createWebpackCompiler({ hotReloadable, isServer }) {
  const currentWorkingDirectory = resolve(".");
  return getEntryAsync({ currentWorkingDirectory, hotReloadable, isServer }).then((entry) => {
    return webpack({
      entry,
      context: currentWorkingDirectory,
      module: {
        loaders: [
          {
            include: [
              `${process.cwd()}/pages`,
            ],
            loader: "hot-self-accept",
            test: /\.js$/,
          },
          {
            loaders: ["style-component", "css", "sass"],
            test: /\.scss$/,
          },
          {
            exclude: /node_modules/,
            loader: "babel",
            query: {
              plugins: [
                [
                  require.resolve("babel-plugin-module-resolver"),
                  {
                    alias: {
                      react: require.resolve("react"),
                      "modan/head": require.resolve("./head"),
                    },
                  },
                ],
              ],
              presets: [
                "es2015",
                "react",
              ],
            },
            test: /\.js$/,
          },
        ],
      },
      output: {
        filename: "[name]",
        libraryTarget: "commonjs2",
        path: `${currentWorkingDirectory}/.modan`,
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
          `${__dirname}/../node_modules`,
          `${currentWorkingDirectory}/node_modules`,
        ],
      },
      resolveLoader: {
        root: [
          `${__dirname}/../node_modules`,
          __dirname,
        ]
      },
    });
  });
}
