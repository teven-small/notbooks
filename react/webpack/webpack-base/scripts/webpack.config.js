const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'static/js/[name].[chunkHash:8].js'
   },
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
         },
         {
            test: /\.less$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'],
         },
         {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: 'static/images/[name].[ext]',
                     publicPath: '/'
                  }
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
         title: 'webpack',
         template: 'public/index.html'
      }),
      new MiniCssExtractPlugin({
         filename: 'static/css/[name].[chunkHash:8].css'
         // Options similar to the same options in webpackOptions.output
         // all options are optional
         // filename: '[name].css',
         // chunkFilename: '[id].css',
         // ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new CopyPlugin([
         {
            from: path.resolve(process.cwd(), 'src/static/'),
            to: path.resolve(process.cwd(), 'dist/static')
         },
      ]),
   ],
   devServer: {
      open: true,
      port: 3000
   }
}