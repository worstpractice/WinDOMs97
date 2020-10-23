import type { Handler } from "typings/Handler";

export const onLMB = <T extends NonNullable<HTMLElement | Document>>(fn: Handler<T>) => {
  const inner: Handler<T> = (e) => {
    if (e.button === 0) {
      fn(e);
    }
  };

  return inner;
};
