require('babel-register');
require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');
const testEnv = require('./tools/webpack/environments').testEnv;

const runner = (config) => {
  return config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    singleRun: false, //just run once by default
    frameworks: [ 'mocha' ], //use the mocha test framework
    files: [
      'src/**/*.spec.js',
    ],
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'src/*.js': ['webpack', 'sourcemap'],
    },
    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: testEnv(),
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
  });
};

module.exports = runner;
