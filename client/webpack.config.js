var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './src/index.jsx'],
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
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map'
}
