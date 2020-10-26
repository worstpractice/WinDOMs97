import { onLMB } from "event-filters/onLMB";
import { OsWindowChromeArea } from "features/os-window/chrome-area/OsWindowChromeArea";
import { ProgramArea } from "features/os-window/program-area/ProgramArea";
import { ProgramContent } from "features/os-window/program-area/ProgramContent";
import { useOnMoveWindow } from "hooks/os-window/useOnMoveWindow";
import { useOnResizeWindow } from "hooks/os-window/useOnResizeWindow";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel/useKernel";
import { default as React, useState } from "react";
import { is } from "type-predicates/is";
import type { FC } from "typings/FC";
import type { OS } from "typings/kernel/OS";
import type { Loader } from "typings/Loader";
import { css } from "utils/css";
import { moveInFront } from "utils/moveInFront";
import { blockNativeDrag } from "utils/os-window/blockNativeDrag";
import styles from "./OsWindow.module.css";

const selector = ({ activate, closeMenus }: OS) => ({
  activate,
  closeMenus,
});

type Props = {
  getProcess: Loader;
};

export const OsWindow: FC<Props> = ({ getProcess }) => {
  const { activate, closeMenus } = useKernel(selector);
  const osWindowRef = useOsRef<HTMLElement>();
  const process = getProcess(osWindowRef);
  const handleResize = useOnResizeWindow(osWindowRef);
  const [isResizable, setIsResizable] = useState(false);
  const handleMove = useOnMoveWindow(osWindowRef);
  useActivateOnMount(osWindowRef);

  /////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  /////////////////////////////////////////////////////////////////////////////////////////

  const handleEnter = () => {
    setIsResizable(true);
  };

  const handleLeave = () => {
    setIsResizable(false);
  };

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

  /////////////////////////////////////////////////////////////////////////////////////////
  // Loaders
  /////////////////////////////////////////////////////////////////////////////////////////

  const toChromeArea: Loader = (chromeAreaRef) => {
    process.chromeAreaRef = chromeAreaRef;
    return process;
  };

  const toProgram: Loader = (programRef) => {
    process.programRef = programRef;
    return process;
  };

  ///////////////////////////////////////////////////////////////////////////////////

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
      <OsWindowChromeArea getProcess={toChromeArea} handleMove={handleMove} />
      <ProgramArea>
        <ProgramContent>
          <Program getProcess={toProgram} />
        </ProgramContent>
      </ProgramArea>
    </article>
  );
};
