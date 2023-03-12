import 'webpack-dev-server';

export default () => ({
  devServer: {
    static: './dist',
    historyApiFallback: true,
    compress: true,
    port: 8080,
    open: false,
  },
});
