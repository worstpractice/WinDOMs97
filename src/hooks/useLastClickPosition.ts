import { useKernel } from "kernel";
import { useEffect } from "react";
import type { Handler } from "typings/Handler";
import { listen } from "utils/listen";

export const useLastClickPosition = () => {
  const { closeMenus, setLastClickPosition } = useKernel();

  useEffect(() => {
    const handleMouseDown: Handler<Document> = ({ clientX, clientY }) => {
      setLastClickPosition({ x: clientX, y: clientY });
      closeMenus();
    };

    // NOTE: It's subtle, but we ARE providing `useEffect` with a cleanup function.
    return listen({
      event: "mousedown",
      handler: handleMouseDown,
      on: document,
    });
  }, [closeMenus, setLastClickPosition]);
};
