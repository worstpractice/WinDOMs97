import { onLMB } from "event-filters/onLMB";
import { useCanvasRef } from "programs/paint/hooks/useCanvasRef";
import { useOsRef } from "hooks/useOsRef";
import type { FC } from "typings/FC";
import React, { useState } from "react";
import type { Position } from "typings/Position";
import { drawLine } from "./utils/drawLine";
import styles from "./Paint.module.css";

type Props = {};

export const Paint: FC<Props> = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const frameRef = useOsRef<HTMLElement>();
  const canvasRef = useOsRef<HTMLCanvasElement>();
  const ctxRef = useCanvasRef();

  if (canvasRef.current) {
    if (!ctxRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");
    }
  }

  const handleMouseDown = onLMB<HTMLCanvasElement>(({ nativeEvent: { offsetX, offsetY } }) => {
    // Offset === from the edge of the canvas.
    setPosition(() => ({ x: offsetX, y: offsetY }));
    setIsDrawing(true);
  });

  const handleMouseLeave = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = onLMB<HTMLCanvasElement>(({ nativeEvent: { offsetX, offsetY } }) => {
    if (!isDrawing) return;

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

  const handleMouseUp = onLMB<HTMLCanvasElement>(({ nativeEvent: { offsetX, offsetY } }) => {
    if (!isDrawing) return;

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
