import { useLayoutEffect } from 'react';
import type { Process } from 'src/typings/Process';

export const useStartingDimensions = (process: Process) => {
  // NOTE: For whatever reason, this doesn't work with `useLayoutEffect`. So be it.
  useLayoutEffect(() => {
    const { binaryImage, osWindowRef } = process;
    const { current: osWindow } = osWindowRef;

    if (!osWindow) return;

    const { x: width, y: height } = binaryImage.startingDimensions;

    osWindow.style.width = `${width}px`;
    osWindow.style.height = `${height}px`;
  }, [process]);
};
