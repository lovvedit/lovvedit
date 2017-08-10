/**
 * @overview
 * Mongoose configuration.
 */

import mongoose from 'mongoose';
import logger from 'winston';

const MONGO_NAME = process.env.MONGO_NAME;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;

const MONGO_CONNECTION_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;
mongoose.Promise = Promise;

mongoose.connect(MONGO_CONNECTION_URL, { useMongoClient: true });
const db = mongoose.connection;

db
  .on('error', err => logger.error(err))
  .on('open', () => logger.info(`MongoDB connection established at ${MONGO_CONNECTION_URL}`))
  .on('disconnected', () => logger.info('MongoDB disconnected'));

// Close the MongoDB connection if server is killed
process.on('SIGINT', () => db.close(() => process.exit(0)));

export default db;
