import { useEffect, useState } from 'react';
import { onLMB } from 'src/event-filters/onLMB';
import { useActiveState } from 'src/state/useActiveState';
import { useMenuState } from 'src/state/useMenuState';
import type { ComposedFn } from 'src/typings/ComposedFn';
import type { MouseHandler } from 'src/typings/handlers/MouseHandler';
import type { OsRef } from 'src/typings/OsRef';
import type { Position } from 'src/typings/Position';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { MenuState } from 'src/typings/state/MenuState';
import { compose } from 'src/utils/compose';
import { listen } from 'src/utils/listen';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ setActiveRef }: ActiveState) => {
  return {
    setActiveRef,
  };
};

const fromMenu = ({ closeMenus }: MenuState) => {
  return {
    closeMenus,
  };
};
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
        if (current !== target) return;

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
          event: 'mousedown',
          handler: handleMouseDown,
          on: document,
          options: { capture: true },
        }),
        /////////////////////////////
        listen({
          event: 'mousemove',
          handler: handleMouseMove,
          on: document,
          options: { capture: true },
        }),
        /////////////////////////////
        listen({
          event: 'mouseup',
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
