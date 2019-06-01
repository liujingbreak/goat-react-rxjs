"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support/register');
const require_injector_1 = __importDefault(require("require-injector"));
const path_1 = __importDefault(require("path"));
// const externals = require('webpack-node-externals');
process.on('unhandledRejection', err => {
    throw err;
});
process.on('uncaughtException', err => {
    console.error(err);
});
const ij = new require_injector_1.default();
global.__SSR = function (config) {
    // config.mode = 'development';
    config.entry = [path_1.default.resolve('src/App.tsx')];
    config.output.path = path_1.default.resolve('ssr-build');
    config.output.filename = '[name].js';
    config.output.chunkFilename = '[name].chunk.js';
    config.resolve.mainFields = ['main', 'module'];
    config.target = 'node';
    config.optimization = { minimize: false };
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
ij.fromDir('node_modules/react-scripts').alias('..\/config\/webpack.config', require.resolve('../webpack.config'));
require('react-scripts/scripts/build');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjcmlwdHMvc3NyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDdkMsd0VBQXdDO0FBRXhDLGdEQUF3QjtBQUV4Qix1REFBdUQ7QUFFdkQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUN0QyxNQUFNLEdBQUcsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDO0FBQ0wsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxFQUFFLEdBQUcsSUFBSSwwQkFBUSxFQUFFLENBQUM7QUFDekIsTUFBYyxDQUFDLEtBQUssR0FBRyxVQUFTLE1BQXFCO0lBQ3JELCtCQUErQjtJQUMvQixNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO0lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLGlCQUFpQixDQUFDO0lBRWhELE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7SUFDeEMsTUFBTSxDQUFDLFNBQVMsR0FBRztRQUNsQixhQUFhO0tBQ2IsQ0FBQztJQUNGLHVCQUF1QjtJQUN2QixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLDhGQUE4RjtJQUM5RixzREFBc0Q7SUFDdEQsbURBQW1EO0lBQ25ELGtFQUFrRTtJQUNsRSx3QkFBd0I7SUFDeEIsTUFBTTtJQUVOLFVBQVU7SUFDViwrQkFBK0I7SUFDL0IsNENBQTRDO0lBQzVDLGNBQWM7SUFDZCwwREFBMEQ7SUFDMUQsaUJBQWlCO0lBQ2pCLE1BQU07SUFDTixLQUFLO0lBQ0wsS0FBSztJQUNMLE9BQU8sTUFBTSxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBS0YsRUFBRSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFDMUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7QUFFdkMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUMifQ==