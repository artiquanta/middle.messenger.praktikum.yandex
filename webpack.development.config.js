const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/index.ts' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    compress: true,
    port: 8080,
    open: false,
  },
  resolve: {
    extensions: [
      '.ts',
      'tsx',
      '.js',
    ],
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts'],
    },
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
        }, 'postcss-loader'],
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/images/favicon.svg', // добавить тип
      meta: {
        charset: 'UTF-8',
        'http-equiv': 'IE=edge',
        viewport: 'width=device-width, initial-scale=1.0',
        title: 'Проектная работа. Мессенджер',
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
