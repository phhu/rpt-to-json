var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './main.js',
     output: {
         path: path.resolve(__dirname, 'dist'),
         filename: 'bundle.js'
     },
     module: {
         rules: [
             {
                 test: /\.js$/,
                 use: {
                  loader: 'babel-loader',
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    }
     //devtool: 'source-map'
 };