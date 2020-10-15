import { onLMB } from "event-filters/onLMB";
import type { OsRef } from "typings/OsRef";
import { compose } from "utils/compose";
import { listen } from "utils/listen";
// import { moveInFront } from "utils/moveInFront";
// import styles from "./useOnDragSelection.module.css";

export const useOnDragSelection = <T extends OsRef<U>, U extends HTMLElement>(desktopRef: T) => {
  console.count("useOnDragSelection");

  const handleMouseDown = onLMB<U>(() => {
    console.count("handleMouseDown");
    const { current: desktop } = desktopRef;

    if (!desktop) return;

    /** `Document`-level event listener. */
    const onMouseMove = onLMB<HTMLBodyElement>(({ clientX, clientY }) => {
      console.count("onMouseMove");
      console.log({ x: clientX, y: clientY });
    });

    let cleanup: () => void;

    /** `Document`-level event listener. */
    const onMouseUp = onLMB<HTMLBodyElement>(() => {
      console.count("onMouseUp");
      cleanup();
    });

    cleanup = compose(listen("mousemove", onMouseMove), listen("mouseup", onMouseUp));
  });

  return handleMouseDown;
};
