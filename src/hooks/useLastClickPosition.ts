import { useKernel } from "kernel";
import { useEffect } from "react";
import type { CleanupFn } from "typings/CleanupFn";
import type { MouseHandler } from "typings/handlers/MouseHandler";
import { listen } from "utils/listen";

export const useLastClickPosition = () => {
  const { closeMenus, setLastClickPosition } = useKernel();

  useEffect(() => {
    let isCancelled = false;

    const effect = (): CleanupFn | undefined => {
      if (isCancelled) return;

      const handleMouseDown: MouseHandler<Document> = ({ clientX, clientY }) => {
        setLastClickPosition({ x: clientX, y: clientY });
        closeMenus();
      };

      // NOTE: It's subtle, but we ARE providing `useEffect` with a cleanup function.
      return listen({
        event: "mousedown",
        handler: handleMouseDown,
        on: document,
      });
    };

    const cleanupFn: CleanupFn | undefined = effect();

    return function cleanup() {
      isCancelled = true;
      cleanupFn?.();
    };
  }, [closeMenus, setLastClickPosition]);
};
