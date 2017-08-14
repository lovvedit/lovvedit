import Post from '../posts/models';

export default function getPosts() {
  return Post.find();
}
