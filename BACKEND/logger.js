const fs = require('fs');
const winston = require('winston');

if (!fs.existsSync(__dirname + '/logs')) {
    fs.mkdirSync(__dirname + '/logs');
}

const logger = new winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `[${[info.timestamp]}][${info.level}]: ${info.message}`),
    ),
    transports: [
        new winston.transports.File({
            name: 'file.info',
            level: 'info',

            filename: __dirname + '/logs/info.log',
            handleExceptions: false,
            json: false,
            maxsize: 100000000, //100MB
            colorize: false
        }),
        new winston.transports.File({
            name: 'file.error',
            level: 'error',
            filename: __dirname + '/logs/error.log',
            handleExceptions: false,
            json: false,
            maxsize: 100000000, //100MB
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: false,
            json: false,
            colorize: true
        })
    ],
    exceptionHandlers: [
        new winston.transports.Console({
            json: false,
            timestamp: true
        }),
        new winston.transports.File({
            filename: __dirname + '/logs/exceptions.log',
            json: false,
            maxsize: 100000000, //100MB
            colorize: false
        })
    ],
    exitOnError: false
});

module.exports = logger;