import mongoose, { Schema } from 'mongoose';

const LikeSchema = new Schema({
  target: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateLiked: {
    type: Date,
    default: Date.now,
  },
});

LikeSchema.index({ target: 1, user: 1 }, { unique: true });

LikeSchema.statics.toggle = async function toggle(target, user) {
  if (await this.findOne({ target, user })) {
    return this.remove({ target, user });
  }

  return this.create({ target, user });
};

export default mongoose.model('Like', LikeSchema);
