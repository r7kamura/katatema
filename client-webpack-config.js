const webpack = require("webpack");

const config = {
  entry: {
    "client/modan-client.js": "./client/modan-client.js",
    "client/modan-hot-reloadable-client.js": [
      "webpack-dev-server/client?http://localhost:4000",
      "./client/modan-hot-reloadable-client.js",
    ],
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel",
        query: {
          plugins: [
            "babel-plugin-transform-remove-strict-mode",
          ]
        },
        test: /\.jsx?$/,
      },
    ],
  },
  output: {
    filename: "[name]",
    path: "./dist",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    }),
  ],
};

module.exports = config;
