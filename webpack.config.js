var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


/**********************
 * Base Configuration *
 **********************/


var config = {
  context: path.join(__dirname, 'public'),
  entry: './js/index.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  }
};


/***********
 * Loaders *
 ***********/


var loaders = [{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel'
}, {
  test: /\.jsx$/,
  exclude: /node_modules/,
  loaders: ['flowcheck', 'babel']
}, {
  test: /\.s?css$/,
  loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
}, {
  test: /\.(otf|eot|svg|ttf|woff|png|jpg)$/,
  loader: 'url-loader?limit=8192'
}];

config.module = {
  loaders: loaders
};


/***********
 * Plugins *
 ***********/


config.plugins = [
  new ExtractTextPlugin('app.[hash].css'),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public/index.html')
  })
];


/*********
 * Proxy *
 *********/

config.devServer = {
  proxy: {
    '^/api': {target: 'http://localhost:8882'}
  }
}

module.exports = config;
