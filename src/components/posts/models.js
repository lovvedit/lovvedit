import mongoose, { Schema } from 'mongoose';

import { getLikeCount, toggleLike, getCommentCount } from '../../utils';

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
  category: {
    type: String,
    enum: ['book', 'movie', 'show', 'game', 'song'],
    required: true,
  },
  genre: {
    type: String,
    trim: true,
  },
  tags: {
    type: [String],
    trim: true,
    default: [],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.methods.getLikeCount = getLikeCount;
PostSchema.methods.getCommentCount = getCommentCount;
PostSchema.methods.toggleLike = toggleLike;

export default mongoose.model('Post', PostSchema);
