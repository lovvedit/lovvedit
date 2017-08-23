export default function resolveGenericSubscription(topic) {
  return ({ [topic]: node }) => node;
}
