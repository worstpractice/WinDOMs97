import { useKernel } from "kernel";
import { useEffect, useState } from "react";
import type { OsRef } from "typings/OsRef";
import type { Position } from "typings/Position";

export const useStayInSight = (contextMenuRef: OsRef<HTMLElement>) => {
  const { lastClickPosition } = useKernel();
  const [isTooFarDown, setIsTooFarDown] = useState(false);
  const [position, setPosition] = useState<Position>(lastClickPosition);

  useEffect(() => {
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

    if (fullX > viewportWidth) {
      console.log("Too far right");

      const deltaX = fullX - viewportWidth;

      adjustedX = clickX - deltaX;
    }

    //////////////////////////////////////////
    // Height (dynamic)
    //////////////////////////////////////////

    const viewportHeight = window.innerHeight;

    const fullY = clickY + menuHeight;

    if (fullY > viewportHeight) {
      console.log("Too far down");

      const deltaY = fullY - viewportHeight;

      adjustedY = clickY - deltaY;

      setIsTooFarDown(true);
    }

    setPosition({ x: adjustedX, y: adjustedY });
  }, [contextMenuRef, isTooFarDown, lastClickPosition]);

  return [isTooFarDown, position] as const;
};
