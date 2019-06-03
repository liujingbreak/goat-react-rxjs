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
process.env.INLINE_RUNTIME_CHUNK = 'false';
const ij = new require_injector_1.default();
global.__SSR = function (config) {
    // config.mode = 'development';
    config.entry = [path_1.default.resolve('./src/ssr.tsx')];
    config.output.path = path_1.default.resolve('ssr-build');
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
        (context, request, callback) => {
            // Absolute & Relative paths are not externals
            if (/^\.{0,2}\//.test(request) || path_1.default.isAbsolute(request)) {
                return callback();
            }
            // console.log('bundled', request);
            // callback();
            try {
                require.resolve(request);
                // console.log('externals:', context, request);
                callback(null, request);
            }
            catch (_a) {
                console.log('bundled', request);
                // Node couldn't find it, so it must be user-aliased
                callback();
            }
        }
    ];
    return config;
};
ij.fromDir('node_modules/react-scripts').alias('..\/config\/webpack.config', require.resolve('../webpack.config'));
require('react-scripts/scripts/build');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjcmlwdHMvc3NyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDdkMsd0VBQXdDO0FBRXhDLGdEQUF3QjtBQUV4Qix1REFBdUQ7QUFFdkQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUN0QyxNQUFNLEdBQUcsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDO0FBQ0wsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUM7QUFDM0MsTUFBTSxFQUFFLEdBQUcsSUFBSSwwQkFBUSxFQUFFLENBQUM7QUFDekIsTUFBYyxDQUFDLEtBQUssR0FBRyxVQUFTLE1BQXFCO0lBQ3JELCtCQUErQjtJQUMvQixNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO0lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLGlCQUFpQixDQUFDO0lBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztJQUV6QyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDMUQsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsTUFBTSxDQUFDLFlBQVksR0FBRztRQUNyQixRQUFRLEVBQUUsS0FBSztRQUNmLDBCQUEwQjtRQUMxQixXQUFXLEVBQUU7WUFDWixNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsV0FBVyxFQUFFO2dCQUNaLFVBQVUsRUFBRTtvQkFDWCxJQUFJLEVBQUUsYUFBYTtvQkFDbkIsTUFBTSxFQUFFLE9BQU87b0JBQ2YsT0FBTyxFQUFFLElBQUk7b0JBQ2IsSUFBSSxFQUFFLHdCQUF3QjtvQkFDOUIsUUFBUSxFQUFFLENBQUM7aUJBQ1g7YUFDRDtTQUNEO0tBQ0QsQ0FBQztJQUVGLE1BQU0sQ0FBQyxTQUFTLEdBQUc7UUFDbEIsaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQixrQkFBa0I7UUFDbEIsc0JBQXNCO1FBQ3RCLGNBQWM7UUFDZCxlQUFlO1FBQ2YsQ0FBQyxPQUFlLEVBQUUsT0FBZSxFQUFFLFFBQWlELEVBQUUsRUFBRTtZQUV2Riw4Q0FBOEM7WUFDOUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGNBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzNELE9BQU8sUUFBUSxFQUFFLENBQUM7YUFDbEI7WUFDRCxtQ0FBbUM7WUFDbkMsY0FBYztZQUNkLElBQUk7Z0JBQ0gsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekIsK0NBQStDO2dCQUMvQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3hCO1lBQUMsV0FBTTtnQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDaEMsb0RBQW9EO2dCQUNwRCxRQUFRLEVBQUUsQ0FBQzthQUNYO1FBQ0YsQ0FBQztLQUNELENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNmLENBQUMsQ0FBQztBQUtGLEVBQUUsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQzFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0FBRXZDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDIn0=