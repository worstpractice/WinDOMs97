export const descending = <T>(a: T, b: T): -1 | 0 | 1 => {
  return a > b ? 1 : b > a ? -1 : 0;
};
