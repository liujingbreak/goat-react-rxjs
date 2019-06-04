"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// tslint:disable:no-console
const lodash_1 = __importDefault(require("lodash"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const util_1 = require("util");
const origWebpackConfig = require('react-scripts/config/webpack.config');
function drawPuppy(slogon, message) {
    if (!slogon) {
        slogon = 'Congrads! Time to publish your shit!';
    }
    console.log('\n   ' + lodash_1.default.repeat('-', slogon.length) + '\n' +
        ` < ${slogon} >\n` +
        '   ' + lodash_1.default.repeat('-', slogon.length) + '\n' +
        '\t\\   ^__^\n\t \\  (oo)\\_______\n\t    (__)\\       )\\/\\\n\t        ||----w |\n\t        ||     ||');
    if (message) {
        console.log(message);
    }
}
function printConfig(c, level = 0) {
    const indent = lodash_1.default.repeat('  ', level);
    let out = '{\n';
    lodash_1.default.forOwn(c, (value, prop) => {
        out += indent + `  ${JSON.stringify(prop)}: ${printConfigValue(value, level)},\n`;
    });
    out += indent + '}';
    return out;
}
function printConfigValue(value, level) {
    let out = '';
    const indent = lodash_1.default.repeat('  ', level);
    if (lodash_1.default.isString(value) || lodash_1.default.isNumber(value) || lodash_1.default.isBoolean(value)) {
        out += JSON.stringify(value) + '';
    }
    else if (Array.isArray(value)) {
        out += '[\n';
        value.forEach((row) => {
            out += indent + '    ' + printConfigValue(row, level + 1);
            out += ',\n';
        });
        out += indent + '  ]';
    }
    else if (lodash_1.default.isFunction(value)) {
        out += value.name + '()';
    }
    else if (util_1.isRegExp(value)) {
        out += `${value.toString()}`;
    }
    else if (lodash_1.default.isObject(value)) {
        const proto = Object.getPrototypeOf(value);
        if (proto && proto.constructor !== Object) {
            out += `new ${proto.constructor.name}()`;
        }
        else {
            out += printConfig(value, level + 1);
        }
    }
    else {
        out += ' unknown';
    }
    return out;
}
module.exports = function (env) {
    drawPuppy('Hacking create-react-app', 'If you want to know how Webpack is configured, check /logs and ' + __filename);
    const config = origWebpackConfig(env);
    // TODO: customizing webpack config
    // - Optimize `splitchunk` for split-load vendor chunks
    // - `noParse` 3rd party library 
    // - loader and plugins for monorepo and multi-repo project
    // - babel-plugin-lodash
    Object.assign(config.resolve.alias, require('rxjs/_esm5/path-mapping')());
    Object.assign(config.optimization.splitChunks, {
        chunks: 'all',
        // name: false, default is false for production
        cacheGroups: {
            lazyVendor: {
                name: 'lazy-vendor',
                chunks: 'async',
                enforce: true,
                test: /[\\/]node_modules[\\/]/,
                priority: 1
            }
        }
    });
    const ssrConfig = global.__SSR;
    if (ssrConfig) {
        ssrConfig(config);
    }
    fs_extra_1.default.mkdirpSync('logs');
    fs_extra_1.default.writeFile('logs/webpack.config.debug.js', printConfig(config), (err) => {
        // just for debug
    });
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvd2VicGFjay5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDRCQUE0QjtBQUM1QixvREFBdUI7QUFDdkIsd0RBQTBCO0FBQzFCLCtCQUFnQztBQUVoQyxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0FBdUN6RSxTQUFTLFNBQVMsQ0FBQyxNQUFjLEVBQUUsT0FBZTtJQUNoRCxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1gsTUFBTSxHQUFHLHNDQUFzQyxDQUFDO0tBQ2pEO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsZ0JBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJO1FBQ3ZELE1BQU0sTUFBTSxNQUFNO1FBQ2xCLEtBQUssR0FBRyxnQkFBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUk7UUFDM0Msd0dBQXdHLENBQUMsQ0FBQztJQUM1RyxJQUFJLE9BQU8sRUFBRTtRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEI7QUFDSCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsQ0FBTSxFQUFFLEtBQUssR0FBRyxDQUFDO0lBQ3BDLE1BQU0sTUFBTSxHQUFHLGdCQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDaEIsZ0JBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBVSxFQUFFLElBQVksRUFBRSxFQUFFO1FBQ3ZDLEdBQUcsSUFBSSxNQUFNLEdBQUcsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLGdCQUFnQixDQUFDLEtB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