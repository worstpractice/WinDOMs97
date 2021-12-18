import { useEffect, useState } from 'react';
import { onLmb } from 'src/event-filters/onLmb';
import { useIsPressed } from 'src/hooks/useIsPressed';
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
import { toFalse } from 'src/utils/setters/toFalse';
import { toInitialPosition } from 'src/utils/setters/toInitialPosition';
import { toTrue } from 'src/utils/setters/toTrue';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('setActiveRef');
const fromMenu = from<MenuState>().select('closeMenus');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useDragSelection = <T extends HTMLElement>(desktopRef: OsRef<T>) => {
  const { setActiveRef } = useActiveState(fromActive);
  const { closeMenus } = useMenuState(fromMenu);
  const [currentPosition, setCurrentPosition] = useState<Position>(toInitialPosition);
  const [isDragSelecting, setIsDragSelecting] = useIsPressed(false);

  useEffect(() => {
    let isCancelled = false;

    const effect = (): ComposedFn | undefined => {
      if (isCancelled) return;

      const handleMouseDown: MouseHandler<HTMLElement> = onLmb<T>(({ clientX, clientY, target }) => {
        if (isCancelled) return;
        if (desktopRef.current !== target) return; // We're only interested in clicks on the actual desktop itself

        setCurrentPosition(() => ({ x: clientX, y: clientY } as const));
        setIsDragSelecting(toTrue);
        closeMenus();
        setActiveRef(desktopRef);
      });

      const handleMouseMove: MouseHandler<HTMLElement> = ({ clientX, clientY }) => {
        if (isCancelled) return;
        if (!isDragSelecting) return;

        setCurrentPosition(() => ({ x: clientX, y: clientY } as const));
      };

      const handleMouseUp: MouseHandler<HTMLElement> = onLmb<T>(() => {
        if (isCancelled) return;

        setIsDragSelecting(toFalse);
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
  }, [closeMenus, desktopRef, isDragSelecting, setActiveRef, setIsDragSelecting]);

  return [isDragSelecting, currentPosition] as const;
};
