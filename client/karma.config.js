var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var APP_DIR = '.';

var webpackConfig = {
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
            'node_modules'
        ]
    },

    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: path.resolve(__dirname, '/dist/img/[name].[hash:7].[ext]')
                }
            }
        ]
    },

    vue: {
        loaders: {
            scss: 'style!css!sass',
            js: 'isparta'
        }
    },

    devtool: '#eval-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"test"'}
        }),

        new webpack.optimize.OccurenceOrderPlugin()
    ]
};

webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || [];
webpackConfig.module.preLoaders.unshift({
    test: /\.js$/,
    loader: 'isparta',
    include: path.resolve('src')
});

module.exports = function (config) {
    config.set({
        logLevel: config.LOG_INFO,
        browsers: ['Chrome'],
        client: {
            mocha: {
                reporter: 'html'
            }
        },
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['dots', 'mocha', 'html', 'coverage'],
        htmlReporter: {
            outputDir: './test/',
            templatePath: null,
            focusOnFailure: true,
            namedFiles: false,
            pageTitle: null,
            urlFriendlyName: false,
            reportName: 'result',
            preserveDescribeNesting: true,
            foldAll: true
        },
        mochaReporter: {
            output: 'autowatch',
            showDiff: true
        },
        coverageReporter: {
            dir: './test/',
            reporters: [
                { type: 'html', subdir: './coverage' }
            ]
        },
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'test/index.js'
        ],
        preprocessors: {
            'test/index.js': ['webpack']
        },
        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        singleRun: true
    });
};
