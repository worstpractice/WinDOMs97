import { onLMB } from "event-filters/onLMB";
import { ChromeArea } from "features/os-window/chrome-area/ChromeArea";
import { OsWindowButtons } from "features/os-window/chrome-area/OsWindowButtons";
import { OsWindowLabel } from "features/os-window/chrome-area/OsWindowLabel";
import { ProgramArea } from "features/os-window/program-area/ProgramArea";
import { ProgramContent } from "features/os-window/program-area/ProgramContent";
import { useOnMoveWindow } from "hooks/os-window/useOnMoveWindow";
import { useOnResizeWindow } from "hooks/os-window/useOnResizeWindow";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useOnDoubleClick } from "hooks/useOnDoubleClick";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import { default as React, useState } from "react";
import { is } from "type-predicates/is";
import type { FC } from "typings/FC";
import type { Kernel } from "typings/kernel/Kernel";
import type { Loader } from "typings/Loader";
import { css } from "utils/css";
import { moveInFront } from "utils/moveInFront";
import { blockNativeDrag } from "utils/os-window/blockNativeDrag";
import styles from "./OsWindow.module.css";

const selector = ({ activate, closeMenus, maximize, unMaximize }: Kernel) => ({
  activate,
  closeMenus,
  maximize,
  unMaximize,
});

type Props = {
  getProcess: Loader;
};

export const OsWindow: FC<Props> = ({ getProcess }) => {
  const { activate, closeMenus, maximize, unMaximize } = useKernel(selector);
  const osWindowRef = useOsRef<HTMLElement>();
  const process = getProcess(osWindowRef);
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

  const { binaryImage, isMaximized, isMinimized, pid } = process;

  const Program = binaryImage.instructions;

  const style = css(
    styles.OsWindow,
    isMaximized ? styles.Maximized : "",
    isMinimized ? styles.Minimized : "",
    isResizable ? styles.Resizable : "",
  );

  const left = 30 * pid;
  const top = 20 * pid;

  const toProgram: Loader = (programRef) => {
    process.programRef = programRef;
    return process;
  };

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
          <Program getProcess={toProgram} />
        </ProgramContent>
      </ProgramArea>
    </article>
  );
};
