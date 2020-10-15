import type { FC } from "react";
import * as React from "react";
import type { Position } from "typings/Position";
import style from "./DragSelection.module.css";

type Props = {
  currentPosition: Position;
};

export const DragSelection: FC<Props> = ({ currentPosition }) => {
  const { x, y } = currentPosition;

  return <div className={style.DragSelection} style={{ left: x, top: y }} />;
};
