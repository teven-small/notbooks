npm网址： www.npmjs.com
	webpack

1. 创建文件
  mkdir webpack-base    
  MIT  协议

2. 项目初始化
  npm init

3. 安装webpack-cli
  npm i wenpack webpack-cli -D
  
  "script":{
      "build": "webpack --mode production" || "build": "webpack --mode development"
   }

   新建webpack.config.js

const path = require('path')
module.exports = {
    // entry: './src/home.js',
    entry: {
        main: './src/home.js',
        index: './src/home.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].[chunkHash:8].js'		hash	chunkHash  哈希值
    }
}

4. 打包index页面
  npm i --save-dev html-webpack-plugin
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Webpack App',
        template: 'public/index.html'
    }),
  ],

  打包修改title <%= htmlWebpackPlugin.options.title %>

5. 打包css文件
  npm install --save-dev css-loader
  npm install --save-dev style-loader
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
    ],
  },
  npm install --save-dev mini-css-extract-plugin
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'static/css/[name].[chunkHash:8].css',
      //chunkFilename: '[id].css',
      //ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ]

6. 开发服务器 代码时时更新
  npm install webpack-dev-server --save-dev
  devServer: {
    port: 3000,
    open: true
  }
  "build": "webpack --mode production --config scripts/webpack.config.prodc.js",
  "dev": "webpack-dev-server --mode development --config scripts/webpack.config.dev.js",
  此时打包会在scripts下  需要改为
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'js/[name].[chunkHash:8].js'
  },

7. css预处理
  npm install less-loader less --save-dev
  rules: [
     {
	test: /\.less$/i,
	use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
   ],

8. css3兼容加前缀
   npm i postcss-loader autoprefixer -D
    rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {

                        }
                    }
                ],
            },
        ],
  
  新建 postcss.config.js
  module.exports = {
    plugins: [
        require('autoprefixer')
    ]
  }

  autoprefixer、 browserslist
 
  在package.json中
  原：
     "browserslist": [
        "last 1 version",
        "> 1%",
        "IE 10"
      ]
  优化后：
     "browserslist": [
        "cover 99.5%"
      ]


9.处理图片
npm install file-loader --save-dev  绝对路径

 module: {
    rules:[
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
      ]
  }

  npm install url-loader --save-dev   相对路径
  rules:[
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
          {
              loader: 'url-loader',
              options: {
                  limit: 8192,    //超出一个限制会使用file-lpader处理
              },
          },
      ],
    },

  拷贝某些静态资源  copy-webpack-plugin
  npm install copy-webpack-plugin --save-dev

  const CopyPlugin = require('copy-webpack-plugin');
  new CopyPlugin([
    {
	from: path.resolve(process.cwd(), 'src/static/'),
	to: path.resolve(process.cwd(), 'dist/static')
    },
  ]),

10. 安装 babel-loader
  npm install -D babel-loader @babel/core @babel/preset-env
  module: {
    rules: [
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
    ]
}
  webpack-merge