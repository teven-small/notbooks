// module.exports = function override(config, env) {
//     //如果没有使用customize-cra，do stuff with the webpack config...
//     return config;
// }
const { override, addDecoratorsLegacy } = require('customize-cra')

module.exports = override(
    addDecoratorsLegacy()
)