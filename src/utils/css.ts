/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable unicorn/prefer-object-from-entries */
// import type { CSSProperties } from "react";

import type { CSSProperties } from 'react';

// const toCssProperties = (acc: CSSProperties, cssProperties: CSSProperties) => {
//   return {
//     ...acc,
//     ...cssProperties,
//   } as const;
// };

// export const css = (...args: readonly (CSSProperties | false)[]): CSSProperties => {
//   const withoutBools: readonly CSSProperties[] = args.filter(Boolean) as readonly CSSProperties[];

//   return withoutBools.reduce<CSSProperties>(toCssProperties, {} as const);
// };

export const oldCss = (...args: (CSSProperties | string | undefined)[]): CSSProperties => {
  return (
    args.filter(Boolean).filter((arg) => {
      return typeof arg !== 'string';
    }) as readonly CSSProperties[]
  ).reduce((acc, arg) => {
    return { ...acc, ...arg };
  }, {});
};
