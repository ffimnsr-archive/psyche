import webpack from "webpack";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const config = {
  entry: {
    psyche: path.resolve(__dirname, "src/Main.tsx")
  },
  optimization: {
    runtimeChunk: true,
    moduleIds: "hashed",
    splitChunks: {
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      cacheGroups: {
        vendors: {
          chunks: "initial",
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          enforce: true
        }
      }
    },
    occurrenceOrder: true
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/",
              publicPath: "assets/images/"
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|otf|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/fonts/",
              publicPath: "assets/fonts/"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist/")
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css"
    }),
    new HtmlWebpackPlugin({
      template: "src/templates/index.html",
      favicon: "src/assets/images/favicon.ico",
      minify: true
    }),
    new webpack.BannerPlugin("Open Sesame")
  ]
};

export default config;
