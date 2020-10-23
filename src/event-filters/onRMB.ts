import type { Handler } from "typings/Handler";

export const onRMB = <T extends NonNullable<HTMLElement>>(fn: Handler<T>) => {
  const inner: Handler<T> = (e) => {
    if (e.button === 2) {
      fn(e);
    }
  };

  return inner;
};
