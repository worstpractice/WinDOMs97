export const create = <T>() => {
  const as = <U extends T>(input: T & U): U => input;

  return as;
};
