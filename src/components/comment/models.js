import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  title: {
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
  upVotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
  },
});

CommentSchema.virtual('score').get(function getCommentScore() {
  return this.upVotes - this.downVotes;
});

export default mongoose.model('Comment', CommentSchema);
