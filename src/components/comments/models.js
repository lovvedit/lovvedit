import mongoose, { Schema } from 'mongoose';

import { getLikeCount, toggleLike, getCommentCount } from '../../utils';

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

CommentSchema.methods.getLikeCount = getLikeCount;
CommentSchema.methods.getCommentCount = getCommentCount;
CommentSchema.methods.toggleLike = toggleLike;

export default mongoose.model('Comment', CommentSchema);
