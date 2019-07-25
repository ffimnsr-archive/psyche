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
    port: 4000,
    index: "index.html"
  },
  stats: "normal",
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development"
    })
  ]
});
