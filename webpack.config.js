const { resolve } = require('path');
const webpack = require('webpack');

module.exports = function () {
    return {
        entry: ["./index.d.js"],
        output: {
            filename: "index.js",
            path: resolve(__dirname, './test'),
            publicPath: '/'
        },
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            }]
        },
        plugins: [new webpack.NamedModulesPlugin()],
    };
}