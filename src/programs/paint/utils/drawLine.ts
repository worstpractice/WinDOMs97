import type { CanvasRef } from 'src/typings/CanvasRef';
import type { Position } from 'src/typings/Position';

export const drawLine = ({ current: ctx }: CanvasRef, moveTo: Position, lineTo: Position) => {
  if (!ctx) return;

  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ////////////////////////////////

  const { x: mX, y: mY } = moveTo;

  ctx.moveTo(mX, mY);

  ////////////////////////////////

  const { x: lX, y: lY } = lineTo;

  ctx.lineTo(lX, lY);

  ////////////////////////////////
  ctx.stroke();
  ctx.closePath();
};
