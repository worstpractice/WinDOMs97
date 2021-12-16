export const keyOf = <T, U extends keyof T = keyof T>(key: U): U => {
  return key;
};
