// tslint:disable:no-console
import _ from 'lodash';
import fs from 'fs-extra';
import { isRegExp } from 'util';
import {Configuration} from 'webpack';
const origWebpackConfig = require('react-scripts/config/webpack.config');

export = function(env: any) {
  drawPuppy('Hacking create-react-app', 'If you want to know how Webpack is configured, check /logs and ' + __filename);
  const config: Configuration = origWebpackConfig(env);
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

  const ssrConfig = (global as any).__SSR;
  if (ssrConfig) {
    ssrConfig(config);
  }

  fs.mkdirpSync('logs');
  fs.writeFile('logs/webpack.config.debug.js', printConfig(config), (err) => {
    // just for debug
  });
  return config;
};

function drawPuppy(slogon: string, message: string) {
  if (!slogon) {
    slogon = 'Congrads! Time to publish your shit!';
  }

  console.log('\n   ' + _.repeat('-', slogon.length) + '\n' +
    ` < ${slogon} >\n` +
    '   ' + _.repeat('-', slogon.length) + '\n' +
    '\t\\   ^__^\n\t \\  (oo)\\_______\n\t    (__)\\       )\\/\\\n\t        ||----w |\n\t        ||     ||');
  if (message) {
    console.log(message);
  }
}

function printConfig(c: any, level = 0): string {
  const indent = _.repeat('  ', level);
  let out = '{\n';
  _.forOwn(c, (value: any, prop: string) => {
    out += indent + `  ${JSON.stringify(prop)}: ${printConfigValue(value, level)},\n`;
  });
  out += indent + '}';
  return out;
}

function printConfigValue(value: any, level: number): string {
  let out = '';
  const indent = _.repeat('  ', level);
  if (_.isString(value) || _.isNumber(value) || _.isBoolean(value)) {
    out += JSON.stringify(value) + '';
  } else if (Array.isArray(value)) {
    out += '[\n';
    (value as any[]).forEach((row: any) => {
      out += indent + '    ' + printConfigValue(row, level + 1);
      out += ',\n';
    });
    out += indent + '  ]';
  } else if (_.isFunction(value)) {
    out += value.name + '()';
  } else if (isRegExp(value)) {
    out += `${value.toString()}`;
  } else if (_.isObject(value)) {
    const proto = Object.getPrototypeOf(value);
    if (proto && proto.constructor !== Object) {
      out += `new ${proto.constructor.name}()`;
    } else {
      out += printConfig(value, level + 1);
    }
  } else {
    out += ' unknown';
  }
  return out;
}
