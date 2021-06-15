import merge from "webpack-merge";
import webpack from "webpack";
import path from "path";
import DotenvWebpack from "dotenv-webpack";
import CopyPlugin from "copy-webpack-plugin";
import common from "./webpack.common.babel";

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    host: "0.0.0.0",
    port: 8080,
  },
  stats: "normal",
  output: {
    path: path.resolve(__dirname, "./dist/debug/"),
  },
  plugins: [
    new DotenvWebpack(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/assets/images/apple-touch-icon.png"),
          to: path.resolve(__dirname, "./dist/debug/"),
        },
      ],
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),
  ],
});
