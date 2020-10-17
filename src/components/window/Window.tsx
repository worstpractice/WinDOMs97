import { ChromeArea } from "components/window/chrome-area/ChromeArea";
import { WindowButtons } from "components/window/chrome-area/WindowButtons";
import { WindowTitle } from "components/window/chrome-area/WindowTitle";
import { ProgramArea } from "components/window/program-area/ProgramArea";
import { ProgramContent } from "components/window/program-area/ProgramContent";
import { onLMB } from "event-filters/onLMB";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useOnDoubleClick } from "hooks/useOnDoubleClick";
import { useOnMoveWindow } from "hooks/useOnMoveWindow";
import { useOnResizeWindow } from "hooks/useOnResizeWindow";
import { useOsRef } from "hooks/useOsRef";
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

export const Window: FC<Props> = ({ closeMenus, process }) => {
  const { activate, maximize, unMaximize } = useKernel();
  const windowRef = useOsRef<HTMLElement>();
  const handleMove = useOnMoveWindow(windowRef);
  const handleResize = useOnResizeWindow(windowRef);
  const [isResizable, setIsResizable] = useState(false);
  useActivateOnMount(windowRef);

  const handleDoubleClick = () => {
    const { isMaximized, windowRef } = process;
    activate(windowRef);
    isMaximized ? unMaximize(process) : maximize(process);
  };

  const { chromeAreaRef } = process;

  // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
  const handleMouseDownCapture = useOnDoubleClick(chromeAreaRef, handleDoubleClick);

  // NOTE: This is vital. This is the line where each `Process` is given its very own `Window` handle.
  process.windowRef = windowRef;

  const handleMouseDown = onLMB<HTMLElement>((e) => {
    closeMenus();
    activate(windowRef);
    moveInFront(windowRef);

    // Not resizable at the moment? That means we're done here.
    if (!isResizable) return;

    const { target } = e;

    // Abort resizing if click target was not current window.
    if (!is(target, windowRef.current)) return;

    handleResize(e);
  });

  const handleChromeDrag = onLMB<HTMLSpanElement>((e) => {
    const { isMaximized } = process;

    // Trying to move a maximized window? That's a paddlin'.
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

  const left = 30 * pid;
  const top = 20 * pid;

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
        // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
        onMouseDownCapture={handleMouseDownCapture}
        onMouseDown={handleChromeDrag}
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
