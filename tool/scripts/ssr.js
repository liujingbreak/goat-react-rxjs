"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support/register');
const require_injector_1 = __importDefault(require("require-injector"));
const path_1 = __importDefault(require("path"));
const ij = new require_injector_1.default();
global.__SSR = function (config) {
    config.mode = 'development';
    config.entry = [path_1.default.resolve('src/App.tsx')];
    config.output.path = path_1.default.resolve('ssr-build');
    config.output.filename = '[name].js';
    config.output.chunkFilename = '[name].chunk.js';
    config.resolve.mainFields = ['main', 'module'];
    config.target = 'node';
    config.optimization = { minimize: false };
    config.externals = [
        // /^@angular/,
        (context, request, callback) => {
            // Absolute & Relative paths are not externals
            if (/^\.{0,2}\//.test(request) || path_1.default.isAbsolute(request)) {
                return callback();
            }
            try {
                require.resolve(request);
                callback(null, request);
            }
            catch (_a) {
                // Node couldn't find it, so it must be user-aliased
                callback();
            }
        },
    ];
    return config;
};
ij.fromDir('node_modules/react-scripts').alias('..\/config\/webpack.config', require.resolve('../webpack.config'));
require('react-scripts/scripts/build');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjcmlwdHMvc3NyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDdkMsd0VBQXdDO0FBRXhDLGdEQUF3QjtBQUd4QixNQUFNLEVBQUUsR0FBRyxJQUFJLDBCQUFRLEVBQUUsQ0FBQztBQUN6QixNQUFjLENBQUMsS0FBSyxHQUFHLFVBQVMsTUFBcUI7SUFDckQsTUFBTSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7SUFDNUIsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztJQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQztJQUVoRCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixNQUFNLENBQUMsWUFBWSxHQUFHLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDO0lBQ3hDLE1BQU0sQ0FBQyxTQUFTLEdBQUc7UUFDbEIsZUFBZTtRQUNmLENBQUMsT0FBZSxFQUFFLE9BQWUsRUFBRSxRQUFpRCxFQUFFLEVBQUU7WUFDdEYsOENBQThDO1lBQzlDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxjQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM3RCxPQUFPLFFBQVEsRUFBRSxDQUFDO2FBQ2hCO1lBRUQsSUFBSTtnQkFDTCxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QixRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3RCO1lBQUMsV0FBTTtnQkFDVCxvREFBb0Q7Z0JBQ3BELFFBQVEsRUFBRSxDQUFDO2FBQ1Q7UUFDSCxDQUFDO0tBQ0MsQ0FBQztJQUNKLE9BQU8sTUFBTSxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBS0YsRUFBRSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFDMUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7QUFFdkMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUMifQ==