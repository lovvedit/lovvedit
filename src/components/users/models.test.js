import mongoose from 'mongoose';

import configureMongo from '../../config/mongoose';
import User from './models';

describe('User', () => {
  beforeAll(async () => {
    const { MONGO_HOST, MONGO_PORT } = process.env;
    const MONGO_NAME = 'lovvedit_test';
    const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;
    console.log(MONGO_URI);
    mongoose.Promise = Promise;

    await configureMongo(mongoose, MONGO_URI);
  });

  beforeEach(async () => mongoose.connection.dropDatabase());

  afterAll(async () => mongoose.connection.close());

  describe('comparePassword()', () => {
    it('should return true when passwords match', async () => {
      const password = 'pA$$w0rD';
      const user = await User.create({
        username: 'test_username',
        password,
      });

      await expect(user.comparePassword(password)).resolves.toBe(true);
    });

    it("should return false when passwords don't match", async () => {
      const password = 'pA$$w0rD';
      const badPassword = 'bad_password';
      const user = await User.create({
        username: 'test_username',
        password,
      });

      await expect(user.comparePassword(badPassword)).resolves.toBe(false);
    });
  });
});
