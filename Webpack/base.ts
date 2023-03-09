import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import tsLoader from './tsLoader';
import handlebarsLoader from './handlebarsLoader';
import postcss from './postcss';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

export default () => merge<Configuration>(
  [
    {
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
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: 'asset/resource',
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
        }),
        new CleanWebpackPlugin(),
      ],
    },
    tsLoader(),
    postcss(),
    handlebarsLoader(),
  ],
);
