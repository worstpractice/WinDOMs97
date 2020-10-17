import { ChromeArea } from "components/window/chrome-area/ChromeArea";
import { WindowButtons } from "components/window/chrome-area/WindowButtons";
import { WindowTitle } from "components/window/chrome-area/WindowTitle";
import { ProgramArea } from "components/window/program-area/ProgramArea";
import { ProgramContent } from "components/window/program-area/ProgramContent";
import { onLMB } from "event-filters/onLMB";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useDomRef } from "hooks/useDomRef";
import { useOnMoveWindow } from "hooks/useOnMoveWindow";
import { useOnResizeWindow } from "hooks/useOnResizeWindow";
import { useKernel } from "kernel";
import { Cmd } from "programs/cmd/Cmd";
import React, { useState } from "react";
import { is } from "type-predicates/is";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import { blockNativeDrag } from "utils/blockNativeDrag";
import { css } from "utils/css";
import { moveInFront } from "utils/moveInFront";
import styles from "./Window.module.css";

type Props = {
  closeMenus: () => void;
  process: Process;
};

/** AT MOST this much time (in ms) may elapse BETWEEN clicks to double click successfully. */
const MAX_DELAY = 250 as const;

export const Window: FC<Props> = ({ closeMenus, process }) => {
  const { activate, maximize, unMaximize } = useKernel();
  const windowRef = useDomRef<HTMLElement>();
  const chromeOutlineRef = useDomRef<HTMLSpanElement>();
  const handleMove = useOnMoveWindow(windowRef);
  const handleResize = useOnResizeWindow(windowRef);
  const [isResizable, setIsResizable] = useState(false);
  useActivateOnMount(windowRef);
  const [msSinceClick, setMsSinceClick] = useState(Infinity);
  const [is2ndClick, setIs2ndClick] = useState(false);

  // NOTE: This is vital. This is the line where each process is given its very own `Window` handle.
  process.windowRef = windowRef;

  const handleMouseDown = onLMB<HTMLElement>((e) => {
    console.log(e.target);
    console.log(process.chromeAreaRef.current);
    closeMenus();
    activate(windowRef);
    moveInFront(windowRef);

    if (!isResizable) return;

    const { target } = e;

    // Abort resizing if click target was not current window
    if (!is(target, windowRef.current)) return;

    handleResize(e);
  });

  const handleChromeDrag = onLMB<HTMLSpanElement>((e) => {
    const { isMaximized } = process;

    // Moving a maximized window? That's a paddling.
    if (isMaximized) return;

    handleMove(e);
  });

  const handleEnter = () => {
    setIsResizable(true);
  };

  const handleLeave = () => {
    setIsResizable(false);
  };

  const { isMaximized, isMinimized, pid } = process;

  const style = css(
    styles.Window,
    isMaximized ? styles.Maximized : "",
    isMinimized ? styles.Minimized : "",
    isResizable ? styles.Resizable : "",
  );

  const left = `${30 * pid}px`;
  const top = `${20 * pid}px`;

  ////////////////////////////////////////////////////////////////////////////////////
  // Workaround for Chrome mysteriously swallowing events (that work flawlessly in FF)
  ////////////////////////////////////////////////////////////////////////////////////

  const handleDoubleClick = () => {
    const { isMaximized, windowRef } = process;

    activate(windowRef);

    isMaximized ? unMaximize(process) : maximize(process);
  };

  const handleConsecutiveClicks = (target: EventTarget) => {
    const { current: chromeArea } = process.chromeAreaRef;

    if (!chromeArea) return;

    // We only care about clicks on the `ChromeArea`.
    if (!is(chromeArea, target)) {
      // No consecutive clicks on the `ChromeArea` then.
      return setIs2ndClick(false);
    }
    // Current click was on `ChromeArea`!

    if (is2ndClick) {
      // The last click was ALSO on `ChromeArea`?
      return handleDoubleClick();
    }

    // Fair enough -- we'll atleast remember that THIS click was on `ChromeArea`.
    setIs2ndClick(true);
  };

  const handleMouseDownCapture = onLMB<HTMLSpanElement>(({ target }) => {
    setMsSinceClick(() => {
      const now = new Date().getTime();

      const elapsed = now - msSinceClick;

      if (elapsed < MAX_DELAY) {
        handleConsecutiveClicks(target);
      }

      // Make sure to return the current time since we're in a setter.
      return now;
    });
  });

  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <article
      className={style}
      onDragStart={blockNativeDrag}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={windowRef}
      style={{ left, top }}
    >
      <span
        className={styles.Outline}
        onMouseDownCapture={handleMouseDownCapture}
        onMouseDown={handleChromeDrag}
        ref={chromeOutlineRef}
      >
        <ChromeArea process={process}>
          <WindowTitle process={process} />
          <WindowButtons closeMenus={closeMenus} process={process} />
        </ChromeArea>
      </span>
      <ProgramArea>
        <ProgramContent>
          <Cmd />
        </ProgramContent>
      </ProgramArea>
    </article>
  );
};
