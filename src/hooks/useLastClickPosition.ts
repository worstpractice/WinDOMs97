import { useKernel } from "kernel";
import type { MouseEventHandler } from "react";
import { useEffect } from "react";
import { listen } from "utils/listen";

export const useLastClickPosition = () => {
  const { setLastClickPosition } = useKernel();

  useEffect(() => {
    const handleMouseDown: MouseEventHandler = (e) => {
      const { clientX, clientY } = e;
      setLastClickPosition({ x: clientX, y: clientY });
    };

    listen("mousedown", handleMouseDown, { capture: true, once: true });
  }, [setLastClickPosition]);
};
