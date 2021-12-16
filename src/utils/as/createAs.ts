export const createAs = <T>() => {
  const as = <U extends T>(value: T & U): U => {
    return value;
  };

  return as;
};
