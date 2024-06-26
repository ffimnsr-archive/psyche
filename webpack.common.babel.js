import webpack from "webpack";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import pack from "./package.json";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const revision = require("child_process")
  .execSync("git rev-parse --short HEAD")
  .toString()
  .trim();

const config = {
  entry: {
    psyche: path.resolve(__dirname, "src/Main.tsx"),
  },
  optimization: {
    runtimeChunk: true,
    moduleIds: "deterministic",
    splitChunks: {
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      cacheGroups: {
        defaultVendors: {
          chunks: "initial",
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext][query]",
        },
      },
      {
        test: /\.(eot|ttf|otf|woff(2)?)(\?[a-z0-9]+)?$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    fallback: {
      // stream: require.resolve("stream-browserify"),
      // zlib: require.resolve("browserify-zlib"),
      // util: require.resolve("util/"),
      // buffer: require.resolve("buffer/"),
      // assert: require.resolve("assert/"),
    },
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist/"),
    publicPath: "/",
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
    }),
    new HtmlWebpackPlugin({
      template: "src/templates/index.html",
      favicon: "src/assets/images/favicon.ico",
      minify: true,
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pack.version),
      BUILD_HASH: JSON.stringify(revision),
    }),
    new webpack.BannerPlugin(`Open Sesame v${pack.version}.${revision}`),
  ],
};

export default config;
