import express from 'express';
import ReactDOMServer from 'react-dom/server';

// import fs from 'fs';
// import Path from 'path';
import {SneakerStoreSubjects} from '../../ssr-build/store/SneakerSubjects';
// type SneakerStore = typeof SneakerStoreSubjects;

export default function(router: express.Application | express.Router) {
  // const indexHtml = fs.readFileSync(Path.resolve('build/index.html'));
  const AppServer = require('../ssr-build/main.js');

  router.get('/sneakers', (req, res, next) => {
    const store: SneakerStoreSubjects = AppServer.store;
    store.title.next('Hey Sneakers! (from server side)');
    console.log(ReactDOMServer.renderToString(AppServer.default));
    next();
  });
}
