import type { MouseEventHandler } from "react";

type Params<T extends NonNullable<HTMLElement>> = {
  onLMB?: MouseEventHandler<T>;
  onMMB?: MouseEventHandler<T>;
  onRMB?: MouseEventHandler<T>;
};

// prettier-ignore
export const onAnyMB = <T extends NonNullable<HTMLElement>>({ onLMB, onMMB, onRMB }: Params<T>) => {
  const switcharoo: MouseEventHandler<T> = (e) => {
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
