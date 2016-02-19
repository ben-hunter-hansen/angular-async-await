// Karma configuration
// Generated on Thu Feb 18 2016 21:09:25 GMT-0600 (CST)

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      'src/**/*.js',
      'tests/**/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'tests/**/*.js': ['webpack'],
      'src/**/*.js': ['webpack']
    },
    webpack: {
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ["es2015","stage-3"],
            plugins: [
              "transform-async-to-generator",
              "transform-regenerator",
              "transform-runtime",
              "syntax-async-functions"
            ]
          }
        }]
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
};
