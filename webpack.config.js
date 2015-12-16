var path = require('path');
module.exports = {
    context: __dirname + "/app",
    entry: "./index.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'source-map',
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
            }
        ]
    }
};