import { default as React, useEffect, useRef, useState } from 'react';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import { useIsPressed } from 'src/hooks/useIsPressed';
import type { Loader } from 'src/typings/Loader';
import type { Position } from 'src/typings/Position';
import { css } from 'src/utils/as/css';
import { onLmb } from 'src/utils/event-filters/onLmb';
import { toTrue } from 'src/utils/setters/toTrue';
import { drawLine } from './utils/drawLine';

type Props = {
  readonly getProcess: Loader;
};

export const Paint = ({ getProcess }: Props) => {
  const programRef = useRef<HTMLElement>(null);
  const process = getProcess(programRef);
  const [isDrawing, setIsDrawing] = useIsPressed(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(canvasRef.current?.getContext('2d') ?? null);
  useActivateOnMount(programRef);
  useStartingDimensions(process);

  useEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      ctxRef.current = canvasRef.current?.getContext('2d') ?? null;
    };

    effect();

    return (): void => {
      isCancelled = true;
    };
  }, []);

  const handleMouseDown = onLmb<HTMLCanvasElement>(({ nativeEvent: { offsetX, offsetY } }) => {
    // Offset === from the edge of the canvas.
    setPosition(() => {
      return { x: offsetX, y: offsetY };
    });
    setIsDrawing(toTrue);
  });

  const handleMouseLeave = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = onLmb<HTMLCanvasElement>(({ nativeEvent: { offsetX, offsetY } }) => {
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

  const handleMouseUp = onLmb<HTMLCanvasElement>(({ nativeEvent: { offsetX, offsetY } }) => {
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
  const width = programRef.current?.getBoundingClientRect().width ?? 386; // magic numbers lol
  const height = programRef.current?.getBoundingClientRect().height ?? 286; // ditto

  return (
    <main ref={programRef} style={styles.Frame}>
      <canvas
        // TODO: Make this not be complete bullshit
        height={height}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvasRef}
        style={styles.Frame}
        // TODO: Make this not be complete bullshit
        width={width}
      />
    </main>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Frame: css({
    backgroundColor: 'white',
    cursor: 'crosshair',
    height: '100%',
    width: '100%',
  } as const),
} as const;
