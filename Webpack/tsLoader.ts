export default () => ({
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
    ],
  },
});
