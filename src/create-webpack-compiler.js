import { resolve } from "path";
import glob from "glob-promise";
import webpack from "webpack";
import WriteFilePlugin from "write-file-webpack-plugin"

export default function createWebpackCompiler() {
  const dir = resolve(".");
  return glob("pages/**/*.js", { cwd: dir }).then((pagePaths) => {
    return webpack({
      context: dir,
      entry: pagePaths.reduce((result, pagePath) => {
        result[`bundles/${pagePath}`] = `./${pagePath}`;
        return result;
      }, {}),
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: "file",
            include: [dir],
            query: {
              name: "dist/[path][name].[ext]"
            },
          },
          {
            exclude: /node_modules/,
            loader: "babel",
            query: {
              presets: [
                require.resolve("babel-preset-es2015"),
                require.resolve("babel-preset-react"),
              ],
            },
          }
        ],
      },
      output: {
        filename: "[name]",
        libraryTarget: "commonjs2",
        path: `${dir}/.modan-cache`,
        publicPath: "http://localhost:4000/",
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
      resolveLoader: {
        root: [
          `${__dirname}/../../node_modules`,
        ]
      },
    });
  });
}
