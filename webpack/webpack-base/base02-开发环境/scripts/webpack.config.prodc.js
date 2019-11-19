const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        main: './src/home.js'
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'js/[name].[chunkHash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            template: 'public/index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'css/[name].[chunkHash:8].css',
            //chunkFilename: '[id].css',
            //ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
}