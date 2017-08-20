import mongoose, { Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    validate: {
      validator: isEmail,
      message: 'Invalid email.',
    },
    trim: true,
  },
});

ProfileSchema.virtual('fullName').get(function fullName() {
  const { firstName, lastName } = this;

  if (!firstName || !lastName) {
    return null;
  }

  return `${firstName} ${lastName}`;
});

export default mongoose.model('Profile', ProfileSchema);
