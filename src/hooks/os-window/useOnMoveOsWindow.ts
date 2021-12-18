import type { OsRef } from 'src/typings/OsRef';
import { bringToFront } from 'src/utils/bringToFront';
import { compose } from 'src/utils/compose';
import { onLmb } from 'src/utils/event-filters/onLmb';
import { listen } from 'src/utils/listen';

export const useOnMoveOsWindow = <T extends OsRef<U>, U extends HTMLElement>(osWindowRef: T) => {
  const handleMouseDown = onLmb<U>(({ clientX, clientY }) => {
    const { current: osWindow } = osWindowRef;

    if (!osWindow) return;

    bringToFront(osWindowRef);

    const shiftX = clientX - osWindow.getBoundingClientRect().left;
    const shiftY = clientY - osWindow.getBoundingClientRect().top;

    /** `Document`-level event listener. */
    const onMouseMove = onLmb<Document>(({ clientX, clientY }) => {
      const newLeft = clientX - shiftX;
      const newTop = clientY - shiftY;

      osWindow.style.left = `${newLeft}px`;
      osWindow.style.top = `${newTop}px`;
    });

    let cleanup: () => void; // eslint-disable-line prefer-const

    /** `Document`-level event listener. */
    const onMouseUp = onLmb<Document>(() => {
      cleanup();
    });

    cleanup = compose(listen({ event: 'mousemove', handler: onMouseMove, on: document }), listen({ event: 'mouseup', handler: onMouseUp, on: document }));
  });

  return handleMouseDown;
};
