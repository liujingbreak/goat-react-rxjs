"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support/register');
const require_injector_1 = __importDefault(require("require-injector"));
const ij = new require_injector_1.default();
ij.fromDir('node_modules/react-scripts').alias('..\/config\/webpack.config', require.resolve('../webpack.config'));
require('react-scripts/scripts/start');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ3ZDLHdFQUF3QztBQUV4QyxNQUFNLEVBQUUsR0FBRyxJQUFJLDBCQUFRLEVBQUUsQ0FBQztBQUUxQixFQUFFLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUMxRSxPQUFPLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztBQUV2QyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyJ9