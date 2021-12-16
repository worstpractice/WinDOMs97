import type { MouseHandler } from 'src/typings/handlers/MouseHandler';

export const onRMB = <T extends NonNullable<HTMLElement>>(handler: MouseHandler<T>) => {
  const inner: MouseHandler<T> = (event) => {
    if (event.button === 2) handler(event);
  };

  return inner;
};
