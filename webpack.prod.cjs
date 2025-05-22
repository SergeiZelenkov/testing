const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/cards', to: 'assets/cards' },
      ],
    }),
  ],
});
