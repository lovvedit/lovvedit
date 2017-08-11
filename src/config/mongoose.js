/**
 * @overview
 * Mongoose configuration.
 */

import logger from 'winston';

export default async function configureMongo(mongoose, uri) {
  mongoose.connect(uri, { useMongoClient: true });
  const connection = mongoose.connection;

  connection
    .on('error', err => logger.error(err))
    .on('open', () => logger.info(`MongoDB connection established at ${uri}`))
    .on('disconnected', () => logger.info('MongoDB disconnected'));

  // Close the MongoDB connection if server is killed
  process.on('SIGINT', () => connection.close(() => process.exit(0)));
}
