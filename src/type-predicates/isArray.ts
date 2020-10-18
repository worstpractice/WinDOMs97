export const isArray = (t: unknown): t is Array<unknown> => {
  return Array.isArray(t);
};
