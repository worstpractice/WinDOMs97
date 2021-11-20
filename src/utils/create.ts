export const create = <T>() => {
  const as = <U extends T>(input: T & U): U => {
    return input;
  };

  return as;
};
