/**
 * @overview
 * Winston configuration.
 * Winston is the logger we're using.
 */

const { LOG_FILE } = process.env;

/**
 * @description
 * Configure Winston's transports.
 *
 * @export
 * @param {any} winston - The Winston module.
 * @param {string} level - The log level. E.g. `debug`, `info`, etc.
 */
export default function configureWinston(winston, level) {
  winston.configure({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level,
      }),
    ],
  });

  if (LOG_FILE) {
    winston.add(winston.transports.File({ filename: LOG_FILE }));
  }
}
