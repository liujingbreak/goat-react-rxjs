"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
const { default: app, context } = require('../ssr-build/main.js');
const html = server_1.default.renderToString(app);
// tslint:disable-next-line:no-console
console.log(html, context);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLXNzci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3Rvb2wvcnVuLXNzci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzRUFBOEM7QUFDOUMsTUFBTSxFQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFDLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFaEUsTUFBTSxJQUFJLEdBQUcsZ0JBQWMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUMsc0NBQXNDO0FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDIn0=