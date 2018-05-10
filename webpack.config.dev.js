import path from 'path';

export default {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    noInfo: false,
  },
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    resolve: {
      alias: {
        Constants: path.resolve(__dirname, "..", "src", "constants"),
        Data: path.resolve(__dirname, "..", "src", "data"),
        Engine: path.resolve(__dirname, "..", "src", "engine"),
        Mocks: path.resolve(__dirname, "..", "src", "mocks")
      }
    },
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  }
};
