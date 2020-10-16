import { useKernel } from "kernel";
import type { MouseEventHandler } from "react";
import { useEffect } from "react";
import { listen } from "utils/listen";

export const useLastClickPosition = () => {
  const { setLastClickPosition } = useKernel();

  useEffect(() => {
    const handleMouseDown: MouseEventHandler = ({ clientX, clientY }) => {
      setLastClickPosition({ x: clientX, y: clientY });
    };

    const cleanup = listen({ event: "mousedown", handler: handleMouseDown, on: document });

    return cleanup;
  }, [setLastClickPosition]);
};
