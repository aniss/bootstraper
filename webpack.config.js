var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var RewirePlugin = require('rewire-webpack');
var NODE_ENV = process.env.NODE_ENV;
var DEVELOPMENT = (NODE_ENV === 'development');


/**********************
 * Base Configuration *
 **********************/


var config = {
  context: path.join(__dirname, 'public'),
  entry: './js/app.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: DEVELOPMENT ? 'http://localhost:4000/' : ''
  }
};


/***********
 * Loaders *
 ***********/


var loaders = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loaders: DEVELOPMENT ? ['react-hot', 'babel'] : ['babel']
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
   root: path.resolve(__dirname, './public/js'),
   extensions: ['', '.js', '.jsx']
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
  new webpack.DefinePlugin({ '__DEV__':  DEVELOPMENT}),
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
