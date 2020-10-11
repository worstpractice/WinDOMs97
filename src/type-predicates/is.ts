export const is = (a: unknown, b: unknown): a is typeof b => {
  return (!!a || !!b) && Object.is(a, b);
};
