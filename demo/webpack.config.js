'use strict'
// const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './app.tsx',
  output: {
    filename: 'bundle.js',
    library: 'react_explore',
    libraryExport: 'default',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  // externals: ['react', 'react-dom'],
  devServer: {
    hot: true,
    contentBase: '.',
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.m?jsx?$/,
        // exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin()
  ]
}
