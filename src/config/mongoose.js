/**
 * @overview
 * Mongoose configuration.
 */

import logger from 'winston';

/**
 * @description
 * Connect to the MongoDB database and log its events.
 *
 * @export
 * @param {any} mongoose - The mongoose module.
 * @param {any} uri - The MongoDB connection URI.
 */
export default async function configureMongo(mongoose, uri) {
  const { connection } = mongoose;
  connection
    .on('error', err => logger.error(err))
    .on('open', () => logger.info(`MongoDB connection established at ${uri}`))
    .on('disconnected', () => logger.info('MongoDB connection closed'));

  await mongoose.connect(uri, { useMongoClient: true });

  // Close the MongoDB connection if server is killed
  process.on('SIGINT', () => connection.close(() => process.exit(0)));
}
