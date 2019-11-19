const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkHash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    //MiniCssExtractPlugin.loader,   //提取单独文件
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    // MiniCssExtractPlugin.loader,    //提取单独文件
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {

                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 819200000,    //超出一个限制会使用file-lpader处理
                            name: 'static/images/[name].[ext]',
                            publicPath: '/'
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
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
        new CopyPlugin([
            {
                from: path.resolve(process.cwd(), 'src/static/'),
                to: path.resolve(process.cwd(), 'dist/static')
            },
        ]),
    ],
    devServer: {
        port: 3000,
        open: true
    }
}