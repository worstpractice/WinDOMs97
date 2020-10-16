import type { MouseEventHandler } from "react";

export const onLMB = <T extends NonNullable<HTMLElement> | Document>(fn: MouseEventHandler<T>) => {
  const inner: MouseEventHandler<T> = (e) => {
    if (e.button === 0) {
      fn(e);
    }
  };

  return inner;
};
