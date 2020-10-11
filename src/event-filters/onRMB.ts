import type { MouseEventHandler } from "react";

export const onRMB = (fn: MouseEventHandler) => {
  const inner: MouseEventHandler = (e) => {
    if (e.button === 2) {
      fn(e);
    }
  };

  return inner;
};
