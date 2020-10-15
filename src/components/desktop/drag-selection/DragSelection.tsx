import { useKernel } from "kernel";
import * as React from "react";
import type { FC } from "typings/FC";
import type { Position } from "typings/Position";
import style from "./DragSelection.module.css";

type Props = {
  currentPosition: Position;
};

export const DragSelection: FC<Props> = ({ currentPosition }) => {
  const { lastClickPosition } = useKernel();

  const { x: startX, y: startY } = lastClickPosition;
  
  const { x: currentX, y: currentY } = currentPosition;

  const left = startX;
  const top = startY;

  const width = currentX - startX;
  const height = currentY - startY;

  return <div className={style.DragSelection} style={{ top, left, width, height }} />;
};
