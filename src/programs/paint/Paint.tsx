import { onLMB } from "event-filters/onLMB";
import { useCanvasRef } from "hooks/useCanvas";
import { useDomRef } from "hooks/useDomRef";
import type { FC } from "react";
import React, { useState } from "react";
import type { Position } from "typings/Position";
import { toFalse } from "utils/toFalse";
import { toStartingPosition } from "utils/toStartingPosition";
import { toTrue } from "utils/toTrue";
import { drawLine } from "./drawLine";
import styles from "./Paint.module.css";

type Props = {};

export const Paint: FC<Props> = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const frameRef = useDomRef<HTMLElement>();
  const canvasRef = useDomRef<HTMLCanvasElement>();
  const ctxRef = useCanvasRef();

  if (canvasRef.current) {
    if (!ctxRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");
    }
  }

  const handleMouseDown = onLMB<HTMLCanvasElement>(({ nativeEvent }) => {
    // Offset === from the edge of the canvas.
    const { offsetX, offsetY } = nativeEvent;
    setPosition(() => ({ x: offsetX, y: offsetY }));
    setIsDrawing(toTrue);
  });

  const handleMouseLeave = () => {
    setIsDrawing(toFalse);
  };

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
    setPosition(toStartingPosition);
    setIsDrawing(toFalse);
  });

  // TODO: ???
  const width = frameRef.current?.getBoundingClientRect().width ?? 386; // magic numbers lol
  const height = frameRef.current?.getBoundingClientRect().height ?? 286; // ditto

  return (
    <main className={styles.Frame} ref={frameRef}>
      <canvas
        // TODO: Make this not be complete bullshit
        height={height}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvasRef}
        // TODO: Make this not be complete bullshit
        width={width}
      />
    </main>
  );
};
