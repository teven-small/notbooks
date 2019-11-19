/*
 * @file: config-overrides.js
 * @author Teven
 * @基于customize-cra和react-app-rewired的定制配置
 * 
 */

//从customize-cra中引入一些方法
const {
   override,
   addLessLoader,
   fixBabelImports,
   addDecoratorsLegacy
} = require('customize-cra')

const modifyVars = require('./theme')

module.exports = override(
   fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
   }),

   addDecoratorsLegacy(),

   addLessLoader({
      javascriptEnabled: true,
      modifyVars
   }),
)