import type { MouseEventHandler } from "react";

export const onLMB = (fn: MouseEventHandler) => {
  const inner: MouseEventHandler = (e) => {
    if (e.button === 0) {
      fn(e);
    }
  };

  return inner;
};
