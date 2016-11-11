import webpack from "webpack";
import WriteFilePlugin from "write-file-webpack-plugin"

export default function createWebpackCompiler() {
  return webpack({
    entry: {
      "about.js": "./pages/about.js",
      "index.js": "./pages/index.js",
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: "file",
          include: [process.cwd()],
          query: {
            name: "babel-compiled/[name].[ext]"
          },
        },
        {
          loader: "babel",
        }
      ],
    },
    output: {
      filename: "webpack-bundles/[name]",
      // libraryTarget: "commonjs2",
      path: `${process.cwd()}/.modan-cache`,
      // publicPath: "http://localhost:4000/",
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
  });
}
