var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var RewirePlugin = require('rewire-webpack');
var NODE_ENV = process.env.NODE_ENV;
var development = (NODE_ENV === 'development');

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
  loaders: development ? ['react-hot', 'babel'] : ['babel']
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
   root: path.resolve(__dirname, './public'),
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
  new webpack.DefinePlugin({ '__DEV__':  (NODE_ENV === 'development')})
];

if(development) {
  config.plugins.concat([
    new RewirePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]);
}

/*********
 * Proxy *
 *********/

config.devServer = {
  proxy: {
    '^/api/*': {target: 'http://localhost:8882'}
  }
};

module.exports = config;
