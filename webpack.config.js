'use strict';

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const distPath = resolve(__dirname, 'dist');

const base = {
  mode,
  devtool: mode === 'production' ? 'nosources-source-map' : 'eval-source-map',
  output: {
    path: distPath,
    chunkFilename: '[name].chunk.js',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.dylib', '.dll']
  }
};

const renderPlugins = [
  new HtmlWebpackPlugin({ template: resolve(__dirname, 'index.html') })
];

const config = env => {
  const preload = !!(env && env.preload);
  const main = Object.assign({}, base, {
  target: preload ? 'electron-preload' : 'electron-main',
    output: Object.assign({}, base.output, {
      path: resolve(base.output.path, 'main')
    }),
    entry: preload ? { preload: resolve(__dirname, 'preload.js') }
      : { index: resolve(__dirname, 'main.js') },
    node: { __dirname: false },
    plugins: preload ? undefined : [
      new CopyWebpackPlugin({
        patterns: [{from: resolve(__dirname, 'lib'), to: resolve(base.output.path, 'lib')}]
      })
    ]
  });
  const renderer = Object.assign({}, base, {
    target: 'electron-renderer',
    output: Object.assign({}, base.output, {
      path: resolve(base.output.path, 'renderer')
    }),
    entry: { renderer: resolve(__dirname, 'renderer.js') },
    plugins: renderPlugins
  });
  return [main, renderer];
};

module.exports = config;
