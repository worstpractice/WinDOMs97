import type { Process } from 'src/typings/Process';

export const useOsWindowControls = (process: Process) => {
  const maximize = (): void => {
    process.isMaximized = true;
  };

  const minimize = (): void => {
    process.isMinimized = true;
  };

  const unMaximize = (): void => {
    process.isMaximized = false;
  };

  const unMinimize = (): void => {
    process.isMinimized = false;
  };

  return {
    maximize,
    minimize,
    unMaximize,
    unMinimize,
  } as const;
};
