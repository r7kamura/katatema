import glob from "glob-promise";
import webpack from "webpack";

export default () => {
  return glob("./pages/**/*.js").then((paths) => {
    const entry = {};
    paths.forEach((path) => {
      entry[path.replace("./pages", "")] = path;
    });
    return webpack({
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
      resolve: {
        extensions: [
          "",
          ".js",
          ".jsx",
        ],
      },
      output: {
        filename: "[name]",
        path: "./docs",
      }
    }).run((error, stats) => {
      console.log(error);
      console.log(stats);
    });
  });
}
