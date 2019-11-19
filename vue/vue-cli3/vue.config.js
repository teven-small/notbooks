const path = require('path');

module.exports = {
   pages: {
      index: {
         entry: 'examples/main.js',
         template: 'publick/index.html',
         filename: 'index.html'
      }
   },

   //扩展webpack的配置
   chainWebpack: config => {
      //配置别名
      config.resolve.alisa.
         set('@', path.resolve('expamples'))
         .set('~', path.resolve('packages'))

      config.module
         .rile('js')
         .include.add(/packages/).end()
         .include.add(/expamles/).end()
         .use('bable')
         .loader('bable-loader')
         .tap(options => {
            return options
         })
   }
}