
import ReactDOMServer from 'react-dom/server';
const {default: app, context} = require('../ssr-build/main.js');

const html = ReactDOMServer.renderToString(app);
  // tslint:disable-next-line:no-console
console.log(html, context);

