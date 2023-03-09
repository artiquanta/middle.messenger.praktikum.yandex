import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import path from 'path';
import base from './Webpack/base';
import sourceMap from './Webpack/sourceMap';
import devServer from './Webpack/devServer';

const config = merge<Configuration>([
  {
    entry: { main: './src/index.ts' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '',
    },
  },
  base(),
]);

export default (_: any, argv: any) => {
  if (argv.mode === 'development') {
    return merge<Configuration>([
      config,
      sourceMap(),
      devServer(),
    ]);
  }

  if (argv.mode === 'production') {
    return merge([
      config,
    ]);
  }

  return config;
};
