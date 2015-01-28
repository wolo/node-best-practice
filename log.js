var winston = require('winston');
var fs = require('fs');
var path = require('path');

var logDir = path.join(__dirname, 'log');
if(!fs.existsSync(logDir))
    fs.mkdirSync(logDir);

module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            filename: path.join(logDir, 'application.log'),
            level: "info",
            json: true
        })
    ]
/* TODO: enable for production
,
    exceptionHandlers: [

        new (winston.transports.Console)(),
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            json: true
        })
    ],
    exitOnError: false
*/
});
