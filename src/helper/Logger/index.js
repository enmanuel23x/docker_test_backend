const winston = require('winston');
require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
  filename: './src/log/Console/debug-%DATE%.log',
  options: { flags: 'w' },
  maxSize: '2k',
  maxFiles: '7d',
  json: true,
  watchLog: true
});

var Logger = winston.createLogger({
  transports: [
    transport
  ]
});

module.exports = Logger;