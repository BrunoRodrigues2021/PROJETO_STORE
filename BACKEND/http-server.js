const http = require("http");
const express = require('express');
const logger = require('./logger');
const bodyParser = require('body-parser');
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
        this._app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
            );
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
                return res.status(200).send({ message: 'ok' });
            }
            next();
        });
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

    }

    _setupControllers() {
        this._app.use(`${routesPrefix}/product`, require('./controllers/product-controller'));
        this._app.use(`${routesPrefix}/user`, require('./controllers/user-controller'));
    }
}



module.exports = HttpServer;