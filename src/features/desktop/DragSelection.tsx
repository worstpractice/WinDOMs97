import { default as React } from 'react';
import { useClickState } from 'src/state/useClickState';
import type { Position } from 'src/typings/Position';
import type { ClickState } from 'src/typings/state/ClickState';
import style from './DragSelection.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromClick = ({ lastClickPosition }: ClickState) => {
  return {
    lastClickPosition,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  currentPosition: Position;
};

export const DragSelection = ({ currentPosition }: Props) => {
  const { lastClickPosition } = useClickState(fromClick);

  const { x: startX, y: startY } = lastClickPosition;

  const { x: currentX, y: currentY } = currentPosition;

  const left = startX;
  const top = startY;

  const width = currentX - startX;
  const height = currentY - startY;

  return (
    <div
      className={style.DragSelection}
      style={{
        height,
        left,
        top,
        width,
      }}
    />
  );
};
