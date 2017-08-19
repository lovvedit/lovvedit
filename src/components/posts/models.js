import mongoose, { Schema } from 'mongoose';

import Like from '../likes/models';

const PostSchema = new Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 128,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  body: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.methods.getLikeCount = function getLikeCount() {
  return Like.where({ target: this.id }).count();
};

PostSchema.methods.toggleLike = async function toggleLike(userId) {
  await Like.toggle(this.id, userId);
  return this;
};

export default mongoose.model('Post', PostSchema);
