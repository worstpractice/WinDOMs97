import { onLMB } from "event-filters/onLMB";
import { useCanvasRef } from "hooks/useCanvas";
import { useDomRef } from "hooks/useDomRef";
import type { FC } from "react";
import React, { useState } from "react";
import { CanvasRef } from "typings/CanvasRef";
import type { Position } from "typings/Position";
import styles from "./Paint.module.css";

type Props = {};

const drawLine = ({ current: ctx }: CanvasRef, moveTo: Position, lineTo: Position) => {
  if (!ctx) return;

  ctx.beginPath();
  ctx.strokeStyle = "black";
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

export const Paint: FC<Props> = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const paintRef = useDomRef<HTMLCanvasElement>();
  const ctxRef = useCanvasRef<CanvasRenderingContext2D>();

  if (paintRef.current) {
    if (!ctxRef.current) {
      ctxRef.current = paintRef.current.getContext("2d");
    }
  }

  const handleMouseDown = onLMB<HTMLCanvasElement>(({ nativeEvent }) => {
    // Offset === from the edge of the canvas.
    const { offsetX, offsetY } = nativeEvent;
    setPosition({ x: offsetX, y: offsetY });
    setIsDrawing(true);
  });

  const handleMouseMove = onLMB<HTMLCanvasElement>(({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    const lineTo = {
      x: offsetX,
      y: offsetY,
    };

    const moveTo = {
      x: position.x,
      y: position.y,
    };

    drawLine(ctxRef, moveTo, lineTo);
    setPosition(lineTo);
  });

  const handleMouseUp = onLMB<HTMLCanvasElement>(({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    const lineTo = {
      x: offsetX,
      y: offsetY,
    };

    const moveTo = {
      x: position.x,
      y: position.y,
    };

    drawLine(ctxRef, moveTo, lineTo);
    setPosition({ x: 0, y: 0 });
    setIsDrawing(false);
  });

  return (
    <main className={styles.Paint}>
      <canvas onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} />
    </main>
  );
};
