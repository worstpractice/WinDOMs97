import type { MutableRefObject } from "react";
import { useEffect } from "react";
import { addEventListener } from "utils/addEventListener";

export const useOnMouseDownOutside = (elementRef: MutableRefObject<HTMLDivElement | null>, handler: EventListener) => {
  useEffect(
    function addEventListeners() {
      const listener: EventListener = (event: Event) => {
        if (!elementRef.current) {
          return;
        }

        /** Do nothing when the ref's element (or any of its descendents) was clicked. */
        if (elementRef.current.contains(event.target as Node)) {
          return;
        }

        handler(event);
      };

      // NOTE: this triggers on ANY mouse down event, including contextmenu (because RMB is pushed down)
      const unsubscribe = addEventListener("mousedown", listener);

      return function cleanup() {
        unsubscribe();
      };
    },
    [elementRef, handler],
  );
};
