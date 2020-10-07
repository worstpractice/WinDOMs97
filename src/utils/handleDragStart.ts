import type { DragEventHandler } from "react";

export const handleDragStart: DragEventHandler = (e) => {
  e.preventDefault();
  return false;
};
