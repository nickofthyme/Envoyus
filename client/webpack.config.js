const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = '.';

const baseWebpackConfig = {
  entry: {
    client: [`${APP_DIR}/index.js`]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    moduleDirectories: ['node_modules']
  },

  resolveLoader: {
    root: path.join(__dirname, ' node_modules'),
    fallback: [path.join(__dirname, '../node_modules')]
  },

  output: {
    path: path.resolve(__dirname, `${APP_DIR}/dist`),
    publicPath: '/',
    filename: '[name].js'
  },

  module: {
    preloader: [{
      test: /\.(jsx|js)$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],

    loaders: [{
      test: /\.(jsx|js)$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass')
    }, {
      test: /\.(jpg|png)$/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[hash].[ext]'
      }
    }
    ]
  },

  //  {
  //     test: /\.(jpg|png)$/,
  //     loader: 'url-loader',
  //     options: {
  //       limit: 25000
  //     }
  //   }, 

  sassLoader: {
    includePaths: ['src/assets/styles']
  },
  

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),

    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `${APP_DIR}/dist/index.html`),
      template: path.resolve(__dirname, `${APP_DIR}/index.html`),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module, count) {
        return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                    path.join(__dirname, './node_modules')
                ) === 0
        );
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports = merge(baseWebpackConfig, {
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[id].[chunkhash].js'
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: '"production"' }
      }),

      new webpack.NoErrorsPlugin(),

      new ExtractTextPlugin('[name].[contenthash].css'),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),

      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css)$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  });
} else {
  module.exports = merge(baseWebpackConfig, {
    // devtool: '#eval-source-map',
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: '"development"' }
      }),

      new ExtractTextPlugin('[name].css'),

      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
