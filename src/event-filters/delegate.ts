import type { Handler } from "typings/Handler";

type Params<T extends NonNullable<HTMLElement | Document>> = {
  LMB?: Handler<T>;
  MMB?: Handler<T>;
  RMB?: Handler<T>;
};

export const switchOn = <T extends NonNullable<HTMLElement | Document>>(params: Params<T>) => {
  const { LMB, MMB, RMB } = params;

  const switcharoo: Handler<T> = (e) => {
    switch (e.button) {
      case 0: {
        return LMB?.(e);
      }
      case 1: {
        return MMB?.(e);
      }
      case 2: {
        return RMB?.(e);
      }
    }
  };

  return switcharoo;
};
