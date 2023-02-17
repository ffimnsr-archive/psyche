import merge from "webpack-merge";
import webpack from "webpack";
import path from "path";
import DotenvWebpack from "dotenv-webpack";
import CopyPlugin from "copy-webpack-plugin";
import common from "./webpack.common.babel";

let userObject = {
  firstName: "John",
  lastName: "Smith",
  joinedDate: "1994-06-10",
  email: "juan@example.com",
  publicCode: "PhkLLuFfaCapAi66WPkXVm2dbDN69zR7QLWqJp2efGf",
  socialSecurityNumber: "122-2227",
  clue: {
    bio: "Hello, World!",
    country: {
      name: "Philippines",
    },
  },
  isAccountVerified: true,
  workExperiences: undefined,
  kycState: undefined,
};

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    host: "0.0.0.0",
    port: 8080,
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
          firstName: userObject.firstName,
          lastName: userObject.lastName,
          joinedDate: userObject.joinedDate,
          email: userObject.email,
          publicCode: userObject.publicCode,
        });
      });

      devServer.app.get("/api/user/:id/extended", (_, res) => {
        res.status(200).json(userObject);
      });

      devServer.app.get("/api/work-functions", (_, res) => {
        res.status(200).json([
            "Web Developer",
            "User Experience",
            "Graphic Artist",
          ]
        );
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
