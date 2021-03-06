import Like from '../../components/likes/models';

export default async function resolveIsLiked(target, args, { user }) {
  const like = await Like.findOne({ target: target.id, user });
  return !!like;
}
