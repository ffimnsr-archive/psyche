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
    // public: "sesame.7f000001.nip.io",
    static: path.resolve(__dirname, "./dist/debug"),
    client: {
      overlay: true,
      progress: true,
    },
    onBeforeSetupMiddleware: (devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      devServer.app.get("/api", (_, res) => {
        res.status(200).json({
          msg: "How long is forever?",
        });
      });

      devServer.app.get("/api/hello", (_, res) => {
        res.status(200).json({
          msg: "Hello, World!",
        });
      });

      devServer.app.get("/api/me", (_, res) => {
        res.status(200).json({
          firstName: "Juan",
          lastName: "Dela Cruz",
          joinedDate: "1994-06-04",
          email: "juan@example.com",
          publicCode: "test",
        });
      });

      devServer.app.get("/api/user/:id/extended", (_, res) => {
        res.status(200).json({
          firstName: "Juan",
          lastName: "Dela Cruz",
          joinedDate: "1994-06-04",
          email: "juan@example.com",
          publicCode: "test",
          socialSecurityNumber: "122-2227",
          clue: {
            bio: "Hello, World!",
            country: {
              name: "PH",
            },
          },
          isAccountVerified: true,
          workExperiences: undefined,
          kycState: undefined,
        });
      });
    },
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
