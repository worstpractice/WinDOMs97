import { useKernel } from "kernel";
import { useEffect } from "react";
import type { CleanupFn } from "typings/CleanupFn";
import type { MouseHandler } from "typings/handlers/MouseHandler";
import type { Kernel } from "typings/kernel/Kernel";
import { listen } from "utils/listen";

const selector = ({ closeMenus, setLastClickPosition }: Kernel) => ({
  closeMenus,
  setLastClickPosition,
});

export const useLastClickPosition = () => {
  const { closeMenus, setLastClickPosition } = useKernel(selector);

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
