const {httpServerPort} = require('config');
const HttpServer = require('./http-server');

new HttpServer(httpServerPort).startServer();