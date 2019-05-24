const path = require('path')
const webpack = require('webpack')


module.exports = {
  entry: {
    index: './src/index.js',
    popup: './popup/popup.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  performance: {
    hints: false
  },
  devtool: process.env.NODE_ENV !== 'production'
    ? '#inline-source-map'
    : false
}

if (process.env.NODE_ENV === 'production') {
  const UglifyPlugin = require('uglifyjs-webpack-plugin')
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyPlugin()
  ]
}
