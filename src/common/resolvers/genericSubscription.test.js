import resolveGenericSubscription from './genericSubscription';

describe('resolveGenericSubscription', () => {
  it('should return the node', () => {
    const topic = 'test/TOPIC';
    const payload = { [topic]: 'test' };
    const resolver = resolveGenericSubscription(topic);
    expect(resolver(payload)).toBe(payload[topic]);
  });
});
