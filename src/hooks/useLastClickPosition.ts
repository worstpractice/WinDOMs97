import { useEffect } from 'react';
import { useClickState } from 'src/state/useClickState';
import type { MouseHandler } from 'src/typings/handlers/MouseHandler';
import type { ClickState } from 'src/typings/state/ClickState';
import { listen } from 'src/utils/listen';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromClick = from<ClickState>().select('setLastClickPosition');
////////////////////////////////////////////////////////////////

export const useLastClickPosition = () => {
  const { setLastClickPosition } = useClickState(fromClick);

  useEffect(() => {
    const handleMouseDown: MouseHandler<Document> = ({ pageX, pageY }) => {
      setLastClickPosition({
        x: pageX,
        y: pageY,
      });
    };

    const cleanupFn = listen({
      event: 'mousedown',
      handler: handleMouseDown,
      on: document,
      options: {
        capture: true,
        passive: true,
      },
    });

    return () => {
      cleanupFn?.();
    };
  }, [setLastClickPosition]);
};
