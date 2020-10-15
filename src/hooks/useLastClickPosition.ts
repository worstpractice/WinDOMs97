import { useKernel } from "kernel";
import type { MouseEventHandler } from "react";
import { useEffect } from "react";
import { listen } from "utils/listen";

export const useLastClickPosition = () => {
  const { setLastClickPosition } = useKernel();

  useEffect(() => {
    const handleClick: MouseEventHandler<HTMLBodyElement> = ({ clientX, clientY }) => {
      setLastClickPosition({ x: clientX, y: clientY } as const);
    };

    const cleanup = listen("mousedown", handleClick, { capture: true });

    return cleanup;
  }, [setLastClickPosition]);
};
