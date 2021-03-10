import type { CSSProperties } from "react";

type NamedStyles<T> = {
  readonly [Key in keyof T]: CSSProperties;
};

export const ss = <T extends NamedStyles<T>>(namedStyles: T & NamedStyles<T>) => {
  return namedStyles;
};
