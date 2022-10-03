const http = require("http");
const express = require('express');
const logger = require('./logger');
const bodyParser = require('body-parser');
const CORS = require('cors');
const {httpServerPort, routesPrefix} = require('config');


class HttpServer {
    constructor(port = httpServerPort) {
        this._app = express();
        this._httpServerPort = port;
        this._setupServer();
        this._setupControllers();
        this._server = {};
    }

    startServer() {
        this._server = http.createServer(this._app);
        this._server.listen(this._httpServerPort, '0.0.0.0');
        this._server.on('error', this._onServerError);
        this._server.on('listening', this._onServerListening);

    }

    _onServerListening() {
        logger.info('Server is running');
    }

    _onServerError(error) {
        switch (error.code) {
            case 'EACCES':
                logger.info(this._httpServerPort + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(this._httpServerPort + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    _setupServer() {
        this._app.set('port', this._httpServerPort);
        this._app.use(bodyParser.json({limit: '2mb'}));
        this._app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));
        this._app.use((req, res, next) => {
            this._app.use(CORS);
            next();
        });
    }

    _setupControllers() {
        this._app.use(`${routesPrefix}/product`, require('./controllers/product-controller'));
        this._app.use(`${routesPrefix}/user`, require('./controllers/user-controller'));
    }
}



module.exports = HttpServer;