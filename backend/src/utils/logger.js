const winston = require('winston');

const infologConfiguration = {
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/info.log',
            maxsize: 10000000
        }),
        new winston.transports.File({
            level: 'debug',
            filename: './logs/debug.log',
            maxsize: 10000000
        }),
        new winston.transports.File({
            level: 'error',
            filename: './logs/error.log',
            maxsize: 10000000
        })
    ]
};

const logger = winston.createLogger(infologConfiguration);

module.exports = logger;
