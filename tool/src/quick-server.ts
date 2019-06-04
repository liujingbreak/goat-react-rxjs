// tslint:disable:no-console
import * as http from 'http';
import * as https from 'https';
const compression = require('compression');
import express, {Request, Response, NextFunction} from 'express';

// const log = log4js.getLogger('quick-server');
let server: https.Server | http.Server;

activate();
export function activate() {
  const app = express();
  app.set('trust proxy', true);
  startHttpServer(app);
  // app.use(log4js.connectLogger(log, {
  // 	level: 'INFO'
  // }));
  app.use(compression());
  app.get('/*', (req: Request, res: Response, next: NextFunction) => {
    if ((req.method === 'GET' && req.url.length > 0 && req.path.indexOf('.') < 0)) {
      req.url = '/index.html';
    }
    next();
  });

  app.use(express.static('build'));

  app.use(function(req, res, next) {
    console.log('Not Found: ' + req.originalUrl);
    const err = new Error('Not Found');
    (err as any).status = 404;
    next(err);
  });
  app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status((err as any).status || 500);
    console.error(req.originalUrl, err);
    res.end('' + err);
  });

  function startHttpServer(app: any) {
    console.log('start HTTP');
    const port = parseInt(process.argv[2], 10);
    server = http.createServer(app);
    // Node 8 has a keepAliveTimeout bug which doesn't respect active connections.
    // Connections will end after ~5 seconds (arbitrary), often not letting the full download
    // of large pieces of content, such as a vendor javascript file.  This results in browsers
    // throwing a "net::ERR_CONTENT_LENGTH_MISMATCH" error.
    // https://github.com/angular/angular-cli/issues/7197
    // https://github.com/nodejs/node/issues/13391
    // https://github.com/nodejs/node/commit/2cb6f2b281eb96a7abe16d58af6ebc9ce23d2e96
    if (/^v8.\d.\d+$/.test(process.version)) {
      server.keepAliveTimeout = 30000; // 30 seconds
    }
    server.listen(port);
    server.on('error', (err: Error) => {
      onError(server, port, err);
    });
    server.on('listening', () => {
      onListening(server, 'HTTP Server');
    });
  }

  /**
	 * Event listener for HTTP server "listening" event.
	 */
  function onListening(server: http.Server | https.Server, title: string) {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + JSON.stringify(addr, null, '\t');
    console.log('%s is listening on %s', title ? title : '', bind);
  }

  /**
	 * Event listener for HTTP server "error" event.
	 */
  function onError(server: http.Server | https.Server, port: number | string, error: any) {
    console.error(error);
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}
