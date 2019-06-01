"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const lodash_1 = __importDefault(require("lodash"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const util_1 = require("util");
const origWebpackConfig = require('react-scripts/config/webpack.config');
function drawPuppy(slogon, message) {
    if (!slogon)
        slogon = 'Congrads! Time to publish your shit!';
    console.log('\n   ' + lodash_1.default.repeat('-', slogon.length) + '\n' +
        ` < ${slogon} >\n` +
        '   ' + lodash_1.default.repeat('-', slogon.length) + '\n' +
        '\t\\   ^__^\n\t \\  (oo)\\_______\n\t    (__)\\       )\\/\\\n\t        ||----w |\n\t        ||     ||');
    if (message)
        console.log(message);
}
function printConfig(c, level = 0) {
    var indent = lodash_1.default.repeat('  ', level);
    var out = '{\n';
    lodash_1.default.forOwn(c, (value, prop) => {
        out += indent + `  ${JSON.stringify(prop)}: ${printConfigValue(value, level)},\n`;
    });
    out += indent + '}';
    return out;
}
function printConfigValue(value, level) {
    var out = '';
    var indent = lodash_1.default.repeat('  ', level);
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
    const ssrConfig = global.__SSR;
    if (ssrConfig)
        ssrConfig(config);
    fs_extra_1.default.mkdirpSync('logs');
    fs_extra_1.default.writeFile('logs/webpack.config.debug.js', printConfig(config), (err) => {
        // just for debug
    });
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvd2VicGFjay5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLG9EQUF1QjtBQUN2Qix3REFBMEI7QUFDMUIsK0JBQWdDO0FBRWhDLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7QUF3QnpFLFNBQVMsU0FBUyxDQUFDLE1BQWMsRUFBRSxPQUFlO0lBQ2pELElBQUksQ0FBQyxNQUFNO1FBQ1YsTUFBTSxHQUFHLHNDQUFzQyxDQUFDO0lBRWpELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLGdCQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSTtRQUN4RCxNQUFNLE1BQU0sTUFBTTtRQUNsQixLQUFLLEdBQUcsZ0JBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJO1FBQzNDLHdHQUF3RyxDQUFDLENBQUM7SUFDM0csSUFBSSxPQUFPO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBR0QsU0FBUyxXQUFXLENBQUMsQ0FBTSxFQUFFLEtBQUssR0FBRyxDQUFDO0lBQ3JDLElBQUksTUFBTSxHQUFHLGdCQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDaEIsZ0JBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBVSxFQUFFLElBQVksRUFBRSxFQUFFO1FBQ3hDLEdBQUcsSUFBSSxNQUFNLEdBQUcsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQ25G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