// module.exports = function override(config, env) {
//    //do stuff with the webpack config...
//    如果没有用customize-cra，就在这里可以对config进行配置
//    return config;
// }

const { override, addDecoratorsLegacy } = require('customize-cra')
module.exports = override(
   addDecoratorsLegacy()
)