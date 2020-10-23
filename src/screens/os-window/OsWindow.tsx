import { ChromeArea } from "screens/os-window/chrome-area/ChromeArea";
import { OsWindowButtons } from "screens/os-window/chrome-area/OsWindowButtons";
import { OsWindowLabel } from "screens/os-window/chrome-area/OsWindowLabel";
import { ProgramArea } from "screens/os-window/program-area/ProgramArea";
import { ProgramContent } from "screens/os-window/program-area/ProgramContent";
import { blockNativeDrag } from "utils/os-window/blockNativeDrag";
import { onLMB } from "event-filters/onLMB";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useOnDoubleClick } from "hooks/useOnDoubleClick";
import { useOnMoveWindow } from "hooks/os-window/useOnMoveWindow";
import { useOnResizeWindow } from "hooks/os-window/useOnResizeWindow";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import { Cmd } from "programs/cmd/Cmd";
import React, { useState } from "react";
import { is } from "type-predicates/is";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import { moveInFront } from "utils/moveInFront";
import styles from "./OsWindow.module.css";

type Props = {
  process: Process;
};

export const OsWindow: FC<Props> = ({ process }) => {
  const { activate, closeMenus, maximize, unMaximize } = useKernel();
  const osWindowRef = useOsRef<HTMLElement>();

  // NOTE: This is vital. This is the line where each `Process` is given its very own `OsWindow` handle.
  process.osWindowRef = osWindowRef;

  const handleMove = useOnMoveWindow(osWindowRef);
  const handleResize = useOnResizeWindow(osWindowRef);
  const [isResizable, setIsResizable] = useState(false);
  useActivateOnMount(osWindowRef);

  const handleDoubleClick = () => {
    const { isMaximized, osWindowRef } = process;
    activate(osWindowRef);
    isMaximized ? unMaximize(process) : maximize(process);
  };

  const { chromeAreaRef } = process;

  // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
  const handleMouseDownCapture = useOnDoubleClick(chromeAreaRef, handleDoubleClick);

  const handleMouseDown = onLMB<HTMLElement>((e) => {
    closeMenus();
    activate(osWindowRef);
    moveInFront(osWindowRef);

    // Not resizable at the moment? That means we're done here.
    if (!isResizable) return;

    const { target } = e;
    const { current: osWindow } = osWindowRef;

    // Abort resizing if click target was not current `OsWindow`.
    if (!is(target, osWindow)) return;

    handleResize(e);
  });

  const handleChromeDrag = onLMB<HTMLSpanElement>((e) => {
    const { isMaximized } = process;

    // Trying to move a maximized `OsWindow`? That's a paddling.
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
    styles.OsWindow,
    isMaximized ? styles.Maximized : "",
    isMinimized ? styles.Minimized : "",
    isResizable ? styles.Resizable : "",
  );

  const left = 30 * pid + 750;
  const top = 20 * pid + 250;

  return (
    <article
      className={style}
      onDragStart={blockNativeDrag}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={osWindowRef}
      style={{ left, top }}
    >
      <span
        className={styles.Outline}
        // Workaround for Chrome event handling. Think of this as `onDoubleClick`.
        onMouseDownCapture={handleMouseDownCapture}
        onMouseDown={handleChromeDrag}
      >
        <ChromeArea process={process}>
          <OsWindowLabel process={process} />
          <OsWindowButtons process={process} />
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