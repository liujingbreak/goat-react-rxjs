
import ReactDOMServer from 'react-dom/server';
const serverApp = require('../ssr-build/main.js');

const html = ReactDOMServer.renderToString(serverApp.default);
// tslint:disable-next-line:no-console
console.log(html);
