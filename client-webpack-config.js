const webpack = require("webpack");

const config = {
  entry: {
    "client/modan-client.js": "./client/modan-client.js",
  },
  module: {
    loaders: [
      {
        // exclude: /node_modules/,
        loader: "babel-loader",
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
