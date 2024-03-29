import { useLayoutEffect, useState } from 'react';
import { useClickState } from 'src/state/useClickState';
import type { OsRef } from 'src/typings/OsRef';
import type { Position } from 'src/typings/Position';
import type { ClickState } from 'src/typings/state/ClickState';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromClick = from<ClickState>().select('lastClickPosition');
////////////////////////////////////////////////////////////////

export const useStayInSight = (contextMenuRef: OsRef<HTMLElement>) => {
  const { lastClickPosition } = useClickState(fromClick);
  const [isTooFarDown, setIsTooFarDown] = useState(false);
  const [position, setPosition] = useState<Position>(lastClickPosition);

  useLayoutEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      const { current: contextMenu } = contextMenuRef;

      if (!contextMenu) return;

      const { x: clickX, y: clickY } = lastClickPosition;

      const { width: menuWidth, height: menuHeight } = contextMenu.getBoundingClientRect();

      let adjustedX = clickX;
      let adjustedY = clickY;

      ////////////////////////////////////////////////////////////////
      // Width (static)
      ////////////////////////////////////////////////////////////////
      const viewportWidth = window.innerWidth;

      const fullX = clickX + menuWidth;

      const isTooFarRight = fullX > viewportWidth;

      if (isTooFarRight) {
        const deltaX = fullX - viewportWidth;

        adjustedX = clickX - deltaX;
      }

      ////////////////////////////////////////////////////////////////
      // Height (dynamic)
      ////////////////////////////////////////////////////////////////

      const viewportHeight = window.innerHeight;

      const fullY = clickY + menuHeight;

      const isTooFarDown = fullY > viewportHeight;

      if (isTooFarDown) {
        const deltaY = fullY - viewportHeight;

        adjustedY = clickY - deltaY;

        setIsTooFarDown(true);
      }

      setPosition({ x: adjustedX, y: adjustedY });
    };

    effect();

    return function cleanup() {
      isCancelled = true;
    };
  }, [contextMenuRef, isTooFarDown, lastClickPosition]);

  return [isTooFarDown, position] as const;
};
