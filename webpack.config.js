var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    debug: true,
    outputPathinfo: true,
    displayErrorDetails: true,
    context: __dirname + "/app",
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        "./index.js",
        "./index.html"
    ],
    output: {
        path: __dirname + "/build",
        filename: "scripts/bundle.js"
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin("styles/style.css"),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'iVerbs',
            filename: 'index.html'
        })
    ],
    module : {
        loaders: [
            {
                loader: "babel",
                include: [ path.resolve(__dirname, "app") ],
                exclude: [ path.resolve(__dirname, "node_modules") ],
                test: /\.js?$/,
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                exclude: [ path.resolve(__dirname, "node_modules") ],
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader?sourceMap")
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
                exclude: [ path.resolve(__dirname, "node_modules") ],
                loader: "file"
            },
            {
                test: /\.html/,
                exclude: [ path.resolve(__dirname, "node_modules") ],
                loader: 'html'
            }
        ]
    }
};