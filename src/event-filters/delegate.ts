import type { MouseHandler } from 'src/typings/handlers/MouseHandler';

type Params<T extends NonNullable<HTMLElement | Document>> = {
  LMB?: MouseHandler<T>;
  MMB?: MouseHandler<T>;
  RMB?: MouseHandler<T>;
};

export const switchOn = <T extends NonNullable<HTMLElement | Document>>(params: Params<T>) => {
  const { LMB, MMB, RMB } = params;

  const switcharoo: MouseHandler<T> = (e) => {
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

      default: {
        return;
      }
    }
  };

  return switcharoo;
};
