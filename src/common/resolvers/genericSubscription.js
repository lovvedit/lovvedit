import { curry, prop } from 'ramda';

export default curry((topic, payload) => prop(topic, payload));
