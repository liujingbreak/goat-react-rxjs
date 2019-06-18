"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable:no-console
const http = tslib_1.__importStar(require("http"));
const compression = require('compression');
const express_1 = tslib_1.__importDefault(require("express"));
const sneakers_server_1 = tslib_1.__importDefault(require("../server/sneakers.server"));
const serve_index_1 = tslib_1.__importDefault(require("serve-index"));
// const log = log4js.getLogger('quick-server');
let server;
activate();
function activate() {
    const app = express_1.default();
    app.set('trust proxy', true);
    startHttpServer(app);
    // app.use(log4js.connectLogger(log, {
    // 	level: 'INFO'
    // }));
    app.use(compression());
    if (process.env.LIST_DIR) {
        console.log('Serve static directory', process.env.LIST_DIR);
        app.use(express_1.default.static(process.env.LIST_DIR));
        const indexRoute = serve_index_1.default(process.env.LIST_DIR, { icons: true });
        app.use('/', indexRoute);
    }
    else {
        sneakers_server_1.default(app);
        app.get('/*', (req, res, next) => {
            if ((req.method === 'GET' && req.url.length > 0 && req.path.indexOf('.') < 0)) {
                req.url = '/index.html';
            }
            next();
        });
        app.use(express_1.default.static('build'));
    }
    app.use(function (req, res, next) {
        console.log('Not Found: ' + req.originalUrl);
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.error(req.originalUrl, err);
        res.end('' + err);
    });
    function startHttpServer(app) {
        console.log('start HTTP');
        const port = parseInt(process.argv[2], 10);
        server = http.createServer(app);
        // Node 8 has a keepAliveTimeout bug which doesn't respect active connections.
        // Connections will end after ~5 seconds (arbitrary), often not letting the full download
        // of large pieces of content, such as a vendor javascript file.  This results in browsers
        // throwing a "net::ERR_CONTENT_LENGTH_MISMATCH" error.
        // https://github.com/nodejs/node/issues/13391
        // https://github.com/nodejs/node/commit/2cb6f2b281eb96a7abe16d58af6ebc9ce23d2e96
        if (/^v8.\d.\d+$/.test(process.version)) {
            server.keepAliveTimeout = 30000; // 30 seconds
        }
        server.listen(port);
        server.on('error', (err) => {
            onError(server, port, err);
        });
        server.on('listening', () => {
            onListening(server, 'HTTP Server');
        });
    }
    /**
       * Event listener for HTTP server "listening" event.
       */
    function onListening(server, title) {
        const addr = server.address();
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + JSON.stringify(addr, null, '\t');
        console.log('%s is listening on %s', title ? title : '', bind);
    }
    /**
       * Event listener for HTTP server "error" event.
       */
    function onError(server, port, error) {
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
exports.activate = activate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdG9vbC9xdWljay1zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNEJBQTRCO0FBQzVCLG1EQUE2QjtBQUU3QixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsOERBQWlFO0FBQ2pFLHdGQUFzRDtBQUN0RCxzRUFBcUM7QUFDckMsZ0RBQWdEO0FBQ2hELElBQUksTUFBa0MsQ0FBQztBQUV2QyxRQUFRLEVBQUUsQ0FBQztBQUNYLFNBQWdCLFFBQVE7SUFDdEIsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0lBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdCLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixzQ0FBc0M7SUFDdEMsaUJBQWlCO0lBQ2pCLE9BQU87SUFDUCxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFFdkIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDOUMsTUFBTSxVQUFVLEdBQUcscUJBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBRW5FLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzFCO1NBQU07UUFDTCx5QkFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25C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