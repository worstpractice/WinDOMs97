export const isNull = (a: unknown): a is null => {
  return Object.is(null, a);
};
