export const isUndefined = (a: unknown): a is undefined => {
  return typeof a === 'undefined';
};
