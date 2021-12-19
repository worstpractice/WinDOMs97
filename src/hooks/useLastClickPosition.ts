import { useEffect } from 'react';
import { useClickState } from 'src/state/useClickState';
import type { MouseHandler } from 'src/typings/handlers/MouseHandler';
import type { ClickState } from 'src/typings/state/ClickState';
import { listen } from 'src/utils/listen';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromClick = from<ClickState>().select('setLastClickPosition');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useLastClickPosition = () => {
  const { setLastClickPosition } = useClickState(fromClick);

  useEffect(() => {
    let isCancelled = false;

    const effect = () => {
      if (isCancelled) return;

      const handleMouseDown: MouseHandler<Document> = ({ clientX, clientY }) => {
        setLastClickPosition({ x: clientX, y: clientY });
      };

      // NOTE: It's subtle, but we're passing a cleanup function to `useEffect`.
      return listen({
        event: 'mousedown',
        handler: handleMouseDown,
        on: document,
        options: {
          capture: true,
          passive: true,
        },
      });
    };

    const cleanupFn = effect();

    return () => {
      isCancelled = true;
      cleanupFn?.();
    };
  }, [setLastClickPosition]);
};
