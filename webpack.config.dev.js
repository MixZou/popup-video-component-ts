const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    open: true,
    port: 8787
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        //执行loader顺序是从后往前
        use: ["style-loader", "css-loader"],
        exclude: [path.resolve(__dirname, "src/components")]
      },

      //模块化CSS，不参与全局
      {
        test: /\.css$/,
        //执行loader顺序是从后往前
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              }
            }
          }
        ],
        include: [path.resolve(__dirname, "src/components")]
      },
      {
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".ts", ".js", ".json"] //省略后缀名，注意顺序
  }
};
