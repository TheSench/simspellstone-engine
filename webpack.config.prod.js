import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import path from 'path';

export default {
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    noInfo: false,
  },
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        // https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
        uglifyOptions: {
          keep_classnames: true,
          keep_fnames: true,
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
          }
      }
    }
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
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
