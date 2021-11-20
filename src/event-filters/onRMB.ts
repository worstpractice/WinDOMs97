import type { MouseHandler } from 'typings/handlers/MouseHandler';

export const onRMB = <T extends NonNullable<HTMLElement>>(fn: MouseHandler<T>) => {
  const inner: MouseHandler<T> = (e) => {
    if (e.button === 2) {
      fn(e);
    }
  };

  return inner;
};
