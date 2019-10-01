import merge from "webpack-merge";
import webpack from "webpack";
import path from "path";
import common from "./webpack.common.babel";

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    host: "0.0.0.0",
    port: 8080,
    index: "index.html"
  },
  stats: "normal",
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development"
    })
  ]
});
