// tslint:disable:no-console
require('source-map-support/register');
import Injector from 'require-injector';
import {Configuration} from 'webpack';
import Path from 'path';
import _ from 'lodash';
// const externals = require('webpack-node-externals');

process.on('unhandledRejection', err => {
  throw err;
  });
process.on('uncaughtException', err => {
  console.error(err);
});
process.env.INLINE_RUNTIME_CHUNK = 'false';
const ij = new Injector();
(global as any).__SSR = function(config: Configuration) {
  // config.mode = 'development';
  config.entry = [Path.resolve('./src/App.server.tsx')];
  // config.entry = [Path.resolve('./src/test.tsx')];
  config.output.path = Path.resolve('ssr-build');
  config.output.filename = '[name].js';
  config.output.chunkFilename = '[name].chunk.js';
  config.output.libraryTarget = 'commonjs';

  config.resolve.mainFields = ['main', 'module', 'browser'];
  config.target = 'node';
  config.optimization = {
    minimize: false,
    // runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      name: true,
      cacheGroups: {
        lazyVendor: {
          name: 'lazy-vendor',
          chunks: 'async',
          enforce: true,
          test: /[\\/]node_modules[\\/]/,
          priority: 1
        }
      }
    }
  };

  config.externals = [
    /^rxjs($|[/\\])/i,
    /^lodash($|[/\\])/i,
    /^react($|[/\\])/i,
    /^react-dom($|[/\\])/i,
    // externals()
    // /^@angular/,
    (context: string, request: string, callback: (error?: null, result?: string) => void) => {

      // Absolute & Relative paths are not externals
      if (/^\.{0,2}\//.test(request) || Path.isAbsolute(request)) {
        return callback();
      }
      // console.log('bundled', request);
      // callback();
      try {
        require.resolve(request);
        // console.log('externals:', context, request);
        callback(null, request);
      } catch {
        console.log('bundled', request);
        // Node couldn't find it, so it must be user-aliased
        callback();
      }
    }
  ];
  return config;
};

ij.fromDir('node_modules/react-scripts').alias('..\/config\/webpack.config',
  require.resolve('../webpack.config'));

require('react-scripts/scripts/build');
