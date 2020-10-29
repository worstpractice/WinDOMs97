import { useLayoutEffect, useState } from "react";
import { useKernelState } from "state/useKernelState";
import type { OsRef } from "typings/OsRef";
import type { Position } from "typings/Position";
import type { KernelState } from "state/useKernelState";

const fromKernel = ({ lastClickPosition }: KernelState) => ({
  lastClickPosition,
});

export const useStayInSight = (contextMenuRef: OsRef<HTMLElement>) => {
  const { lastClickPosition } = useKernelState(fromKernel);
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

      //////////////////////////////////////////
      // Width (static)
      //////////////////////////////////////////
      const viewportWidth = window.innerWidth;

      const fullX = clickX + menuWidth;

      const isTooFarRight = fullX > viewportWidth;

      if (isTooFarRight) {
        const deltaX = fullX - viewportWidth;

        adjustedX = clickX - deltaX;
      }

      //////////////////////////////////////////
      // Height (dynamic)
      //////////////////////////////////////////

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
