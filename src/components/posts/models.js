import mongoose, { Schema } from 'mongoose';

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
  upVotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
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

PostSchema.virtual('score').get(function getPostScore() {
  return this.upVotes - this.downVotes;
});

export default mongoose.model('Post', PostSchema);
