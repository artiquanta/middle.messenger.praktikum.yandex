import path from 'path';
import 'webpack-dev-server';

export default () => ({
  devServer: {
    static: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    compress: true,
    port: 8080,
    open: false,
  },
});
