const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    ,
    new ModuleFederationPlugin({
      name: "app",
      shared: {
        react: {
          import: "react", // The "import" property is used to specify the module that should be loaded as a fallback
          shareKey: "react", // The name of the shared module
          shareScope: "default", // The shared scope
          singleton: true, // Only a single version of the shared module should be loaded
        },
        "react-dom": {
          import: "react-dom",
          shareKey: "react-dom",
          shareScope: "default",
          singleton: true,
        },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    proxy: [
      {
        context: ["/jsmfe"],
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
      },
    ],
  },
};
