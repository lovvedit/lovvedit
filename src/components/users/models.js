import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';

const passwordMaxLength = 127;

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
    maxlength: passwordMaxLength,
    required: true,
    select: false,
  },
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 150,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
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

UserSchema.virtual('fullName').get(() => `${this.firstName} ${this.lastName}`);

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
async function comparePassword(password) {
  const { password: hashedPassword } = this.model('User')
    .findOne({ _id: this.id })
    .select({ password: 1 });
  const matches = await bcrypt.compare(password, hashedPassword);

  return matches;
}

UserSchema.methods.comparePassword = comparePassword;

const User = mongoose.model('User', UserSchema);

export { User as default, UserSchema, comparePassword };
