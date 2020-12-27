import { onLMB } from "event-filters/onLMB";
import { useStartingDimensions } from "hooks/programs/useStartingDimensions";
import { useOsRef } from "hooks/useOsRef";
import { useCanvasRef } from "programs/paint/hooks/useCanvasRef";
import { useState } from "react";
import type { FC } from "typings/FC";
import type { Loader } from "typings/Loader";
import type { Position } from "typings/Position";
import styles from "./Paint.module.css";
import { drawLine } from "./utils/drawLine";

type Props = {
  getProcess: Loader;
};

export const Paint: FC<Props> = ({ getProcess }) => {
  const paintRef = useOsRef<HTMLElement>();
  const process = getProcess(paintRef);
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const canvasRef = useOsRef<HTMLCanvasElement>();
  const ctxRef = useCanvasRef();
  useStartingDimensions(process);

  // NOTE: Tsk-tsk-tsk. Trouble abrewin
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
  const width = paintRef.current?.getBoundingClientRect().width ?? 386; // magic numbers lol
  const height = paintRef.current?.getBoundingClientRect().height ?? 286; // ditto

  return (
    <main className={styles.Frame} ref={paintRef}>
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
