import { ChromeArea } from "components/window/chrome-area/ChromeArea";
import { WindowButtons } from "components/window/chrome-area/WindowButtons";
import { WindowTitle } from "components/window/chrome-area/WindowTitle";
import { ProgramArea } from "components/window/program-area/ProgramArea";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useMutableRef } from "hooks/useMutableRef";
import { useOnMoveWindow } from "hooks/useOnMoveWindow";
import { useOnResizeWindow } from "hooks/useOnResizeWindow";
import React, { FC, useState } from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import { blockNativeDrag } from "utils/blockNativeDrag";
import { is } from "type-predicates/is";
import { moveInFront } from "utils/moveInFront";
import { onLMB } from "event-filters/onLMB";
import styles from "./Window.module.css";

type Props = {
  closeMenus: () => void;
  process: Process;
};

export const Window: FC<Props> = ({ children, closeMenus, process }) => {
  const { activate } = useStore();
  const windowRef = useMutableRef();
  const handleMove = useOnMoveWindow(windowRef);
  const handleResize = useOnResizeWindow(windowRef);
  const [isResizable, setIsResizable] = useState<boolean>(false);
  useActivateOnMount(windowRef);

  // NOTE: This is vital. This is the line where each process is given its very own window handle.
  process.windowRef = windowRef;

  const handleActive = onLMB((e) => {
    closeMenus();
    activate(windowRef);
    moveInFront(windowRef);

    if (!isResizable) return;

    const { current } = windowRef;
    const { target } = e;

    // Abort resizing if the click was unrelated to the current window
    if (!is(target, current)) return;

    handleResize(e);
  });

  const handleChromeDrag = onLMB((e) => {
    handleMove(e);
  });

  const handleEnter = () => {
    setIsResizable(true);
  };

  const handleLeave = () => {
    setIsResizable(false);
  };

  const style = isResizable ? css(styles.Window, styles.Resizable) : styles.Window;

  return (
    <article
      className={style}
      onDragStart={blockNativeDrag}
      onMouseDown={handleActive}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={windowRef}
      style={{ left: `${30 * process.pid}px`, top: `${20 * process.pid}px` }}
    >
      <span className={styles.Outline} onMouseDown={handleChromeDrag}>
        <ChromeArea process={process}>
          <WindowTitle process={process} />
          <WindowButtons process={process} />
        </ChromeArea>
      </span>
      <ProgramArea>{children}</ProgramArea>
    </article>
  );
};
