import type { MouseHandler } from 'src/typings/handlers/MouseHandler';

export const onLMB = <T extends NonNullable<HTMLElement | Document>>(fn: MouseHandler<T>) => {
  const inner: MouseHandler<T> = (e) => {
    if (e.button === 0) {
      fn(e);
    }
  };

  return inner;
};
