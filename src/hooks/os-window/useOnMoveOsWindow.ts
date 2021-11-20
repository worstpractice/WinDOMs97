import { onLMB } from 'event-filters/onLMB';
import type { OsRef } from 'typings/OsRef';
import { bringToFront } from 'utils/bringToFront';
import { compose } from 'utils/compose';
import { listen } from 'utils/listen';

export const useOnMoveOsWindow = <T extends OsRef<U>, U extends HTMLElement>(osWindowRef: T) => {
  const handleMouseDown = onLMB<U>(({ clientX, clientY }) => {
    const { current: osWindow } = osWindowRef;

    if (!osWindow) return;

    bringToFront(osWindowRef);

    const shiftX = clientX - osWindow.getBoundingClientRect().left;
    const shiftY = clientY - osWindow.getBoundingClientRect().top;

    /** `Document`-level event listener. */
    const onMouseMove = onLMB<Document>(({ clientX, clientY }) => {
      const newLeft = clientX - shiftX;
      const newTop = clientY - shiftY;

      osWindow.style.left = `${newLeft}px`;
      osWindow.style.top = `${newTop}px`;
    });

    let cleanup: () => void;

    /** `Document`-level event listener. */
    const onMouseUp = onLMB<Document>(() => {
      cleanup();
    });

    cleanup = compose(listen({ event: 'mousemove', handler: onMouseMove, on: document }), listen({ event: 'mouseup', handler: onMouseUp, on: document }));
  });

  return handleMouseDown;
};
