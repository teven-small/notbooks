const path = require('path')
module.exports = {
    // entry: './src/home.js',
    entry: {
        main: './src/home.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkHash:8].js'
    }
}