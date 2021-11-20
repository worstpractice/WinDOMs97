import type { OsRef } from 'src/typings/OsRef';

export const isRef = <T extends OsRef<HTMLElement>>({ current: a }: T, { current: b }: T) => {
  return a === b;
};
