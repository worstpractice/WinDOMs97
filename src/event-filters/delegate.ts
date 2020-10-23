import type { Handler } from "typings/Handler";

type Params<T extends NonNullable<HTMLElement | Document>> = {
  onLMB?: Handler<T>;
  onMMB?: Handler<T>;
  onRMB?: Handler<T>;
};

export const delegate = <T extends NonNullable<HTMLElement | Document>>(params: Params<T>) => {
  const { onLMB, onMMB, onRMB } = params;

  const switcharoo: Handler<T> = (e) => {
    switch (e.button) {
      case 0: {
        return onLMB?.(e);
      }
      case 1: {
        return onMMB?.(e);
      }
      case 2: {
        return onRMB?.(e);
      }
    }
  };

  return switcharoo;
};
