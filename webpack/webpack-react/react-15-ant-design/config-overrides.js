const { override, fixBabelImports, addLessLoader } = require('customize-cra')
// module.exports = function override(config, env) {
//     // do stuff with the webpack config...
//     return config;
// };
const theme = require('./theme')
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
        // style: true,
    }),
);
addLessLoader({
    javascriptEnabled: true,
    modlfyVars: theme
})