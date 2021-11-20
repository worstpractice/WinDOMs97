import { isNull } from 'type-predicates/isNull';

export const isObject = (t: unknown): t is object => {
  return typeof t === 'object' && !isNull(t);
};
