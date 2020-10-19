import { useKernel } from "kernel";
import type { MouseEventHandler } from "react";
import { useLayoutEffect } from "react";
import { listen } from "utils/listen";

export const useLastClickPosition = () => {
  const { closeMenus, setLastClickPosition } = useKernel();

  useLayoutEffect(() => {
    const handleMouseDown: MouseEventHandler = ({ clientX, clientY }) => {
      setLastClickPosition({ x: clientX, y: clientY });
      closeMenus();
    };

    const cleanup = listen({
      event: "mousedown",
      handler: handleMouseDown,
      on: document,
    });

    return cleanup;
  }, [closeMenus, setLastClickPosition]);
};
