import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { is } from "type-predicates/is";
import { OsRef } from "typings/OsRef";
import type { Position } from "typings/Position";
import { compose } from "utils/compose";
import { listen } from "utils/listen";

export const useDragSelection = (desktopRef: OsRef<HTMLElement>, closeMenus: () => void) => {
  const { activate } = useKernel();
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragSelecting, setIsDragSelecting] = useState(false);

  const handleMouseDown = useCallback(
    onLMB<HTMLElement>(({ target }) => {
      const { current } = desktopRef;

      // We're only interested in clicks on the actual desktop itself
      if (!is(current, target)) return;

      setIsDragSelecting(true);
      closeMenus();
      activate(desktopRef);
    }),
    [],
  );

  const handleMouseMove: MouseEventHandler = useCallback(({ clientX, clientY }) => {
    setCurrentPosition({ x: clientX, y: clientY });
  }, []);

  const handleMouseUp = useCallback(
    onLMB<HTMLElement>(() => {
      setIsDragSelecting(false);
    }),
    [],
  );

  useEffect(() => {
    const cleanup = compose(
      listen({
        event: "mousedown",
        handler: handleMouseDown,
        on: document,
        options: { capture: true },
      }),

      listen({
        event: "mousemove",
        handler: handleMouseMove,
        on: document,
        options: { capture: true },
      }),

      listen({
        event: "mouseup",
        handler: handleMouseUp,
        on: document,
        options: { capture: true },
      }),
    );

    return cleanup;
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return [isDragSelecting, currentPosition] as const;
};
