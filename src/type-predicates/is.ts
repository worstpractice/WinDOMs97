export const is = <T>(a: T, b: T): a is T => {
  return (!!a || !!b) && Object.is(a, b);
};
