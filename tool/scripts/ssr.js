"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable:no-console
require('source-map-support/register');
const require_injector_1 = tslib_1.__importDefault(require("require-injector"));
const path_1 = tslib_1.__importDefault(require("path"));
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
    config.entry = [path_1.default.resolve('./src/App.server.tsx')];
    // config.entry = [Path.resolve('./src/test.tsx')];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMvdG9vbC9zY3JpcHRzL3Nzci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0QkFBNEI7QUFDNUIsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDdkMsZ0ZBQXdDO0FBRXhDLHdEQUF3QjtBQUV4Qix1REFBdUQ7QUFFdkQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUNyQyxNQUFNLEdBQUcsQ0FBQztBQUNWLENBQUMsQ0FBQyxDQUFDO0FBQ0wsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUM7QUFDM0MsTUFBTSxFQUFFLEdBQUcsSUFBSSwwQkFBUSxFQUFFLENBQUM7QUFDekIsTUFBYyxDQUFDLEtBQUssR0FBRyxVQUFTLE1BQXFCO0lBQ3BELCtCQUErQjtJQUMvQixNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7SUFDdEQsbURBQW1EO0lBQ25ELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO0lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLGlCQUFpQixDQUFDO0lBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztJQUV6QyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDMUQsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsTUFBTSxDQUFDLFlBQVksR0FBRztRQUNwQixRQUFRLEVBQUUsS0FBSztRQUNmLDBCQUEwQjtRQUMxQixXQUFXLEVBQUU7WUFDWCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsV0FBVyxFQUFFO2dCQUNYLFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsTUFBTSxFQUFFLE9BQU87b0JBQ2YsT0FBTyxFQUFFLElBQUk7b0JBQ2IsSUFBSSxFQUFFLHdCQUF3QjtvQkFDOUIsUUFBUSxFQUFFLENBQUM7aUJBQ1o7YUFDRjtTQUNGO0tBQ0YsQ0FBQztJQUVGLE1BQU0sQ0FBQyxTQUFTLEdBQUc7UUFDakIsaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQixrQkFBa0I7UUFDbEIsc0JBQXNCO1FBQ3RCLGNBQWM7UUFDZCxlQUFlO1FBQ2YsQ0FBQyxPQUFlLEVBQUUsT0FBZSxFQUFFLFFBQWlELEVBQUUsRUFBRTtZQUV0Riw4Q0FBOEM7WUFDOUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGNBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzFELE9BQU8sUUFBUSxFQUFFLENBQUM7YUFDbkI7WUFDRCxtQ0FBbUM7WUFDbkMsY0FBYztZQUNkLElBQUk7Z0JBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekIsK0NBQStDO2dCQUMvQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3pCO1lBQUMsV0FBTTtnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDaEMsb0RBQW9EO2dCQUNwRCxRQUFRLEVBQUUsQ0FBQzthQUNaO1FBQ0gsQ0FBQztLQUNGLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFFRixFQUFFLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUN6RSxPQUFPLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztBQUV4QyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyJ9