import type { MouseEventHandler } from "react";

export const onRMB = <T extends NonNullable<HTMLElement>>(fn: MouseEventHandler<T>) => {
  const inner: MouseEventHandler<T> = (e) => {
    if (e.button === 2) {
      fn(e);
    }
  };

  return inner;
};
