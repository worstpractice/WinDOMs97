export const create = <T>() => {
  const as = <U extends T>(input: T & U): U => input;

  return as;
};

export const convert = <From, To>(converter: <T extends From>(from: T & From) => To) => {
  const innerConvert = <T extends From>(from: T & From) => converter(from);

  return innerConvert;
};
