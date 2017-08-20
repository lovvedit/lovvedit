import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  subject: {
    type: String,
    minlength: 1,
    maxlength: 256,
    required: true,
    trim: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  body: {
    type: String,
    trim: true,
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Message', MessageSchema);
