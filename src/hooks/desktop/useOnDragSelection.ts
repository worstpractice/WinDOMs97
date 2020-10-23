import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel";
import { useCallback, useEffect, useState } from "react";
import { is } from "type-predicates/is";
import type { Handler } from "typings/Handler";
import { OsRef } from "typings/OsRef";
import type { Position } from "typings/Position";
import { compose } from "utils/compose";
import { listen } from "utils/listen";

export const useDragSelection = (desktopRef: OsRef<HTMLElement>) => {
  const { activate, closeMenus } = useKernel();
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragSelecting, setIsDragSelecting] = useState(false);

  const handleMouseDown: Handler<HTMLElement> = useCallback(
    onLMB(({ target }) => {
      const { current } = desktopRef;

      // We're only interested in clicks on the actual desktop itself
      if (!is(current, target)) return;

      setIsDragSelecting(true);
      closeMenus();
      activate(desktopRef);
    }),
    [],
  );

  const handleMouseMove: Handler<HTMLElement> = useCallback(({ clientX, clientY }) => {
    setCurrentPosition({ x: clientX, y: clientY });
  }, []);

  const handleMouseUp: Handler<HTMLElement> = useCallback(
    onLMB(() => {
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
