/**
 * @overview
 * Winston configuration.
 * Winston is the logger we're using.
 */

import winston from 'winston';

const LOG_LEVEL = process.env.LOG_LEVEL;

export default winston.configure({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: LOG_LEVEL,
    }),
  ],
});
