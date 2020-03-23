import webpack from "webpack";
import path from "path";
import merge from "webpack-merge";
import ClosureWebpackPlugin from "closure-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import common from "./webpack.common.babel";

module.exports = merge(common, {
  mode: "production",
  stats: "minimal",
  performance: {
    hints: false,
  },
  optimization: {
    minimizer: [
      new ClosureWebpackPlugin({ mode: "STANDARD" }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist/release/"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: "sha256",
      hashDigest: "hex",
      hashDigestLength: 20,
    }),
  ],
});