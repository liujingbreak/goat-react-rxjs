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

const ij = new Injector();
(global as any).__SSR = function(config: Configuration) {
	// config.mode = 'development';
	config.entry = [Path.resolve('src/App.tsx')];
	config.output.path = Path.resolve('ssr-build');
	config.output.filename = '[name].js';
	config.output.chunkFilename = '[name].chunk.js';

	config.resolve.mainFields = ['main', 'module'];
	config.target = 'node';
	config.optimization = {minimize: false};
	config.externals = [
		/^rxjs[\/\\]/
	];
	// config.externals = [
	// 	// externals()
	// 	// /^@angular/,
	// 	(context: string, request: string, callback: (error?: null, result?: string) => void) => {
	// 		console.log('test externals:', context, request);
	// 		// Absolute & Relative paths are not externals
	// 		if (/^\.{0,2}\//.test(request) || Path.isAbsolute(request)) {
	// 			return callback();
	// 		}
	
	// 		try {
	// 			require.resolve(request);
	// 			callback(null, 'commonjs ' + request);
	// 		} catch {
	// 			// Node couldn't find it, so it must be user-aliased
	// 			callback();
	// 		}
	// 	}
	// ];
	return config;
};




ij.fromDir('node_modules/react-scripts').alias('..\/config\/webpack.config', 
	require.resolve('../webpack.config'));

require('react-scripts/scripts/build');
