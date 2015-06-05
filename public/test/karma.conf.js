/* eslint-disable no-var */

var webpack = require('../../webpack.config');
webpack.devtool = 'inline-source-map';
webpack.module.preLoaders = [{
  test: /\.jsx?$/,
  exclude: /(__tests__|test|node_modules)\//,
  loader: 'isparta-instrumenter-loader'
}];


module.exports = function karmaConfig(config) {
  config.set({
    basePath: '.',
    singleRun: true,
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    reporters: ['spec', 'coverage', 'junit'],
    files: ['test.js'],
    preprocessors: {
      'test.js': ['webpack', 'sourcemap']
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },
    junitReporter: {
      outputFile: 'coverage/test-results.xml',
      suite: ''
    },
    webpack: webpack,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
