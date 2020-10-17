import type { DragEventHandler } from "react";

export const blockNativeDrag: DragEventHandler = (e) => {
  e.preventDefault();
  return false;
};
