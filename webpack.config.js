var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var RewirePlugin = require('rewire-webpack');
var NODE_ENV = process.env.NODE_ENV;

/**********************
 * Base Configuration *
 **********************/


var config = {
  context: path.join(__dirname, 'public'),
  entry: './js/app.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  }
};


/***********
 * Loaders *
 ***********/


var loaders = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel'
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


/*************************
 * Extensions to resolve *
 *************************/


config.resolve = {
   extensions: ['', '.js', '.jsx'],
};


/***********
 * Plugins *
 ***********/

config.plugins = [
  new ExtractTextPlugin('app.[hash].css'),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public/index.html')
  }),
  new webpack.ProvidePlugin({ fetch: 'isomorphic-fetch' }),
  new webpack.DefinePlugin({ '__DEV__':  (NODE_ENV === 'development')}),
  new RewirePlugin()
];


/*********
 * Proxy *
 *********/

config.devServer = {
  proxy: {
    '^/api/*': {target: 'http://localhost:8882'}
  }
};

module.exports = config;
