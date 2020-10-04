import type { MutableRefObject } from "react";
import { useEffect } from "react";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";

/** For when users click outside of some element (e.g: a modal), and you want that "outside click" to gracefully close the modal. */
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

        /** The Start menu and the Start button have a special relationship. */
        if (elementRef.current.id === "StartMenu") {
          const startButton = document.getElementById("StartButton");

          /** Do nothing when the Start button element (or any of its descendents) was clicked. */
          if (startButton?.contains(event.target as Node)) {
            return;
          }
        }

        console.log(elementRef.current.id);

        if (elementRef.current.id === "Desktop") {
          console.log("So far so good");
          if (!Object.is(event.target, elementRef.current.id)) {
            // TODO: Branch here to detect the difference between right-clicking the naked desktop, and right-clicking an icon ON the desktop.
            return;
          }
        }

        /** Consider this click event 'spent' so nested click handlers don't also fire. */
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        handler(event);
      };

      const unsubscribe = compose(addEventListener("mousedown", listener), addEventListener("contextmenu", listener));

      return function cleanup() {
        unsubscribe();
      };
    },
    [elementRef, handler],
  );
};
