/**
 * Created by ben on 2/19/16.
 */
var webpack = require('webpack'),
  path = require('path');

var mod = __dirname + '/dist';

module.exports = {
  context: mod,
  entry: {
    app: path.resolve(__dirname, 'src/angular-async-await.js')
  },
  output: {
    path: mod,
    filename: './angular-async-await.js'
  },
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
};