const { createLogger, format, transports} = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const moment = require('moment');
const fs = require('fs');
const logDir = "/log"

module.exports = function log(info) {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logger = createLogger({
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      prettyPrint()
    ),
    transports: [
      new (transports.Console)({
        level: 'info'
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