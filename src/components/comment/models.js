import mongoose, { Schema } from 'mongoose';

import Like from '../likes/models';

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1024,
  },
  parent: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

CommentSchema.methods.getLikeCount = function getLikeCount() {
  return Like.where({ target: this.id }).count();
};

CommentSchema.methods.toggleLike = async function toggleLike(userId) {
  await Like.toggle(this.id, userId);
  return this;
};

export default mongoose.model('Comment', CommentSchema);
