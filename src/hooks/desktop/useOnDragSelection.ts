import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel";
import { useEffect, useState } from "react";
import { is } from "type-predicates/is";
import { ComposedFn } from "typings/ComposedFn";
import type { Handler } from "typings/Handler";
import { OsRef } from "typings/OsRef";
import type { Position } from "typings/Position";
import { compose } from "utils/compose";
import { listen } from "utils/listen";

export const useDragSelection = (desktopRef: OsRef<HTMLElement>) => {
  const { activate, closeMenus } = useKernel();
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragSelecting, setIsDragSelecting] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const effect = (): ComposedFn | undefined => {
      if (isCancelled) return;

      const handleMouseDown: Handler<HTMLElement> = onLMB(({ target }) => {
        const { current } = desktopRef;

        // We're only interested in clicks on the actual desktop itself
        if (!is(current, target)) return;

        setIsDragSelecting(true);
        closeMenus();
        activate(desktopRef);
      });

      const handleMouseMove: Handler<HTMLElement> = ({ clientX, clientY }) => {
        setCurrentPosition({ x: clientX, y: clientY });
      };

      const handleMouseUp: Handler<HTMLElement> = onLMB(() => {
        setIsDragSelecting(false);
      });

      // NOTE: It's subtle, but we ARE providing `useEffect` with a cleanup function.
      return compose(
        /////////////////////////////
        listen({
          event: "mousedown",
          handler: handleMouseDown,
          on: document,
          options: { capture: true },
        }),
        /////////////////////////////
        listen({
          event: "mousemove",
          handler: handleMouseMove,
          on: document,
          options: { capture: true },
        }),
        /////////////////////////////
        listen({
          event: "mouseup",
          handler: handleMouseUp,
          on: document,
          options: { capture: true },
        }),
        /////////////////////////////
      );
    };

    const composedFn: ComposedFn | undefined = effect();

    return function cleanup() {
      isCancelled = true;
      composedFn?.();
    };
  }, [activate, closeMenus, desktopRef]);

  return [isDragSelecting, currentPosition] as const;
};
