import merge from "webpack-merge";
import webpack from "webpack";
import path from "path";
import DotenvWebpack from "dotenv-webpack";
import common from "./webpack.common.babel";

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    host: "127.0.0.1",
    port: 8080,
  },
  stats: "normal",
  output: {
    path: path.resolve(__dirname, "./dist/debug/"),
  },
  plugins: [
    new DotenvWebpack(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),
  ],
});
