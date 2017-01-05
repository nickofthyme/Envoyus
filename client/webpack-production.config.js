var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './components/index.jsx'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        loader: 'babel-loader',
        test: /\.js(|x)$/,
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015', 'react'],
        },
      }
    ]
  },
  plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: { warnings: false }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('production')
          }
      })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
}
