const winston = require('winston');
const moment = require('moment');
const fs = require('fs');
const logDir = "/log"

module.exports = function log(info) {
  console.log(info);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logger = winston.createLogger({
    transports: [
      new (winston.transports.Console)({
        level: 'info',
        timestamp: function () {
          return moment().format("YYYY-MM-DD HH:mm:ss");
        }
      }),
      new (require('winston-daily-rotate-file'))({
        level: 'info',
        maxsize: 1000000,
        maxFiles: 5,
        timestamp: function () {
          return moment().format("YYYY-MM-DD HH:mm:ss");
        },
        filename: `${logDir}/%DATE%_apl_log.log`,
      })
    ]
  });

  try {
    logger.info(info);
  } catch (exception) {
    logger.error("ERROR=>" + exception);
  }
}