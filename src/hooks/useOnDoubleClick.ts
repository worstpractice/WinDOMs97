import { onLMB } from 'event-filters/onLMB';
import { useState } from 'react';
import type { OsRef } from 'typings/OsRef';

/** AT MOST this much time (in ms) may elapse BETWEEN clicks to double click successfully. */
const MAX_DELAY = 250 as const;

/** Workaround for Chrome mysteriously swallowing events (that work flawlessly in FF). Think of this as regular `onDoubleClick`. */
export const useOnDoubleClick = <T extends HTMLElement>(ref: OsRef<T>, handleDoubleClick: () => void) => {
  const [lastTime, setLastTime] = useState(Number.POSITIVE_INFINITY);
  const [is2ndClick, setIs2ndClick] = useState(false);

  ///////////////////////////////////////////////////////////////////////////////////////////

  const handleConsecutiveClicks = (target: EventTarget) => {
    const { current } = ref;

    if (!current) return;

    // We only care about clicks on the location of interest.
    if (current !== target) {
      // No consecutive clicks on the location of interest then.
      return setIs2ndClick(false);
    }
    // Current click was on location of interest!

    // The prior click was ALSO on location of interest?
    if (is2ndClick) {
      // Double click confirmed!
      return handleDoubleClick();
    }

    // Fair enough -- we'll atleast remember that THIS click was on the location of interest.
    setIs2ndClick(true);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  const handleMouseDownCapture = onLMB<T>(({ target }) => {
    const { current } = ref;

    if (!current) return;

    const now = Date.now();

    const elapsed = now - lastTime;

    if (elapsed < MAX_DELAY) {
      handleConsecutiveClicks(target);
    }

    setLastTime(() => {
      return now;
    });
  });

  ///////////////////////////////////////////////////////////////////////////////////////////

  return handleMouseDownCapture;
};
