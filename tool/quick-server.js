"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const compression = require('compression');
const express_1 = __importDefault(require("express"));
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
    app.get('/*', (req, res, next) => {
        if ((req.method === 'GET' && req.url.length > 0 && req.path.indexOf('.') < 0)) {
            req.url = '/index.html';
        }
        next();
    });
    app.use(express_1.default.static('build'));
    app.use(function (req, res, next) {
        console.log('Not Found: ' + req.originalUrl);
        var err = new Error('Not Found');
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
        // https://github.com/angular/angular-cli/issues/7197
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3F1aWNrLXNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNkI7QUFFN0IsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLHNEQUFpRTtBQUdqRSxnREFBZ0Q7QUFDaEQsSUFBSSxNQUFrQyxDQUFDO0FBRXZDLFFBQVEsRUFBRSxDQUFDO0FBQ1gsU0FBZ0IsUUFBUTtJQUN2QixNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7SUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0IsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLHNDQUFzQztJQUN0QyxpQkFBaUI7SUFDakIsT0FBTztJQUNQLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1FBQ2pFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDN0UsR0FBRyxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUM7U0FDekI7UUFDRCxJQUFJLEVBQUUsQ0FBQztJQUNSLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRWpDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDOUIs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