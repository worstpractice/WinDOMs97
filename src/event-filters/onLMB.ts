import type { MouseHandler } from 'src/typings/handlers/MouseHandler';

export const onLMB = <T extends NonNullable<HTMLElement | Document>>(handler: MouseHandler<T>) => {
  const inner: MouseHandler<T> = (event) => {
    if (event.button === 0) handler(event);
  };

  return inner;
};
