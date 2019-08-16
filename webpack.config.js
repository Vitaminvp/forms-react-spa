const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require("mini-css-extract-plugin");

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },

  mode: IS_PRODUCTION ? "production" : 'development',

  devtool: IS_PRODUCTION ? false : 'inline-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,

    contentBase: "./build",

    proxy: {
      './favicon.ico': 'http://pdffiller.com',
      '/api': {
        target: '',
        pathRewrite: { '^/api': ''},
        changeOrigin: true
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new miniCssExtractPlugin({
      filename: "styles.css"
    })
  ]
};
