import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 50,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    maxlength: 127,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  deactivated: {
    type: Boolean,
    default: false,
  },
});

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

/**
 * Hashes the password before storing it.
 */
UserSchema.pre('save', async function hashPasswordPreSave(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

/**
 * @description
 * Compares a plaintext password with the hashed one stored in the database.
 *
 * @param {string} password - The plaintext password to compare.
 * @returns {boolean}
 */
UserSchema.methods.comparePassword = async function comparePassword(password) {
  const { password: hashedPassword } = await this.model('User')
    .findOne({ _id: this.id })
    .select({ password: 1 });

  return bcrypt.compare(password, hashedPassword);
};

export default mongoose.model('User', UserSchema);
