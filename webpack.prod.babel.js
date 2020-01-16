/* eslint "import/no-extraneous-dependencies": "error" */
import webpack from "webpack";
import merge from "webpack-merge";
import UglifyJSWebpackPlugin from "uglifyjs-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import common from "./webpack.common.babel";

module.exports = merge(common, {
  mode: "production",
  stats: "minimal",
  performance: {
    hints: false
  },
  optimization: {
    minimizer: [
      new UglifyJSWebpackPlugin({
        parallel: true,
        cache: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production"
    })
  ]
});
