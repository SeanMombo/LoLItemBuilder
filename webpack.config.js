const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');





module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {

        host: '0.0.0.0',//your ip address
        port: 8080,
        disableHostCheck: true,
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    // module: {
    //     rules: [
    //       {
    //         test: /\.(jpg|png)$/,
    //         use: {
    //           loader: 'url-loader',
    //         },
    //       },
    //     ],
    //   },
}