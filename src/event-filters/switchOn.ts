import type { MouseHandler } from 'src/typings/handlers/MouseHandler';
import type { MouseHandlers } from 'src/typings/handlers/MouseHandlers';

export const switchOn = <T extends NonNullable<HTMLElement | Document>>({ lmb, mmb, rmb }: MouseHandlers<T>) => {
  const switcharoo: MouseHandler<T> = (event) => {
    switch (event.button) {
      case 0: {
        return lmb?.(event);
      }

      case 1: {
        return mmb?.(event);
      }

      case 2: {
        return rmb?.(event);
      }

      default: {
        return;
      }
    }
  };

  return switcharoo;
};
