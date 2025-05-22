const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html", // Указываем шаблон для HTML
      filename: "./index.html", // Имя итогового HTML файла
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css", // Имя CSS файла
      chunkFilename: "[id].css", // Имя для чанков
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets/cards", to: "assets/cards" },
        { from: "licenses.txt", to: "." }, // копируем в корень сайта
      ],
    }),
  ],
};
