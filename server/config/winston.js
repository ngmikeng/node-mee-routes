const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, simple, colorize } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    // colorize(),
    label({ label: 'App' }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    simple(),
    // prettyPrint()
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message} ${info.level === 'error' ? JSON.stringify(info.error) : ''}`)
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ]
});

//
// If we're not in production then log to the `console`.
//
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  logger.add(new transports.Console());
}

module.exports = logger;
