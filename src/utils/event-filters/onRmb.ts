import type { MouseHandler } from 'src/typings/handlers/MouseHandler';

export const onRmb = <T extends NonNullable<HTMLElement>>(handler: MouseHandler<T>) => {
  const inner: MouseHandler<T> = (event) => {
    if (event.button !== 2) return;

    handler(event);
  };

  return inner;
};
