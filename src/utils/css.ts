// import type { CSSProperties } from "react";

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

export const css = (...args: (string | undefined)[]) => {
  return args.filter(Boolean).join(" ").trim();
};
