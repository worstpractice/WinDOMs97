export const is = <T>(a: T | null, b: T | null): a is T => {
  return (!!a || !!b) && Object.is(a, b);
};
