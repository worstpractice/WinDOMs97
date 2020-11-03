import { onLMB } from "event-filters/onLMB";
import { useEffect, useState } from "react";
import { useActiveState } from "state/useActiveState";
import { useMenuState } from "state/useMenuState";
import { is } from "type-predicates/is";
import { ComposedFn } from "typings/ComposedFn";
import type { MouseHandler } from "typings/handlers/MouseHandler";
import { OsRef } from "typings/OsRef";
import type { Position } from "typings/Position";
import type { ActiveState } from "typings/state/ActiveState";
import type { MenuState } from "typings/state/MenuState";
import { compose } from "utils/compose";
import { listen } from "utils/listen";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ setActiveRef }: ActiveState) => ({
  setActiveRef,
});

const fromMenu = ({ closeMenus }: MenuState) => ({
  closeMenus,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useDragSelection = <T extends HTMLElement>(desktopRef: OsRef<T>) => {
  const { setActiveRef } = useActiveState(fromActive);
  const { closeMenus } = useMenuState(fromMenu);
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragSelecting, setIsDragSelecting] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const effect = (): ComposedFn | undefined => {
      if (isCancelled) return;

      const handleMouseDown: MouseHandler<HTMLElement> = onLMB<T>(({ clientX, clientY, target }) => {
        const { current } = desktopRef;

        // We're only interested in clicks on the actual desktop itself
        if (!is(current, target)) return;

        setCurrentPosition({ x: clientX, y: clientY });
        setIsDragSelecting(true);
        closeMenus();
        setActiveRef(desktopRef);
      });

      const handleMouseMove: MouseHandler<HTMLElement> = ({ clientX, clientY }) => {
        if (!isDragSelecting) return;

        setCurrentPosition({ x: clientX, y: clientY });
      };

      const handleMouseUp: MouseHandler<HTMLElement> = onLMB<T>(() => {
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
  }, [setActiveRef, closeMenus, desktopRef, isDragSelecting]);

  return [isDragSelecting, currentPosition] as const;
};
