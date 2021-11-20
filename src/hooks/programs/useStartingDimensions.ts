import { useEffect } from 'react';
import type { Process } from 'src/typings/Process';

export const useStartingDimensions = (process: Process) => {
  // NOTE: For whatever reason, this doesn't work with `useLayoutEffect`. So be it.
  useEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      const { binaryImage, osWindowRef } = process;
      const { current: osWindow } = osWindowRef;

      if (!osWindow) return;

      const { x: width, y: height } = binaryImage.startingDimensions;

      osWindow.style.width = `${width}px`;
      osWindow.style.height = `${height}px`;
    };

    effect();

    return function cleanup() {
      isCancelled = true;
    };
  }, [process]);
};
