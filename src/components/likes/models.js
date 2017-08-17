import mongoose, { Schema } from 'mongoose';

const LikeSchema = new Schema({
  target: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Like', LikeSchema);
