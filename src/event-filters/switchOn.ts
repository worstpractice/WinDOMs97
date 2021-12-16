import type { MouseHandler } from 'src/typings/handlers/MouseHandler';
import type { MouseHandlers } from 'src/typings/handlers/MouseHandlers';

export const switchOn = <T extends NonNullable<HTMLElement | Document>>({ LMB, MMB, RMB }: MouseHandlers<T>) => {
  const switcharoo: MouseHandler<T> = (event) => {
    switch (event.button) {
      case 0: {
        return LMB?.(event);
      }

      case 1: {
        return MMB?.(event);
      }

      case 2: {
        return RMB?.(event);
      }

      default: {
        return;
      }
    }
  };

  return switcharoo;
};
