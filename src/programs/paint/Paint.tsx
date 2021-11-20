import { default as React, useState } from 'react';
import { onLMB } from 'src/event-filters/onLMB';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useOsRef } from 'src/hooks/useOsRef';
import { useCanvasRef } from 'src/programs/paint/hooks/useCanvasRef';
import type { Loader } from 'src/typings/Loader';
import type { Position } from 'src/typings/Position';
import styles from './Paint.module.css';
import { drawLine } from './utils/drawLine';

type Props = {
  getProcess: Loader;
};

export const Paint = ({ getProcess }: Props) => {
  const paintRef = useOsRef<HTMLElement>();
  const process = getProcess(paintRef);
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const canvasRef = useOsRef<HTMLCanvasElement>();
  const ctxRef = useCanvasRef();
  useStartingDimensions(process);

  // NOTE: Tsk-tsk-tsk. Trouble abrewin
  if (canvasRef.current && !ctxRef.current) {
    ctxRef.current = canvasRef.current.getContext('2d');
  }

  const handleMouseDown = onLMB<HTMLCanvasElement>(({ nativeEvent: { offsetX, offsetY } }) => {
    // Offset === from the edge of the canvas.
    setPosition(() => {
      return { x: offsetX, y: offsetY };
    });
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
