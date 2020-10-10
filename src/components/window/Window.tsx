import { ChromeArea } from "components/window/chrome-area/ChromeArea";
import { WindowButtons } from "components/window/chrome-area/WindowButtons";
import { WindowTitle } from "components/window/chrome-area/WindowTitle";
import { ProgramArea } from "components/window/program-area/ProgramArea";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useMutableRef } from "hooks/useMutableRef";
import { useOnMoveWindow } from "hooks/useOnMoveWindow";
import React, { FC, MouseEventHandler, useState } from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import { handleDragStart } from "utils/handleDragStart";
import { moveInFront } from "utils/moveInFront";
import styles from "./Window.module.css";

type Props = {
  closeMenus: () => void;
  process: Process;
};

export const Window: FC<Props> = ({ children, closeMenus, process }) => {
  const { activate } = useStore();
  const windowRef = useMutableRef();
  const handleMove = useOnMoveWindow(windowRef);
  const [isResizable, setIsResizable] = useState<boolean>(false);
  useActivateOnMount(windowRef);

  // NOTE: This is vital. This is the line where each process is given its very own window handle.
  process.windowRef = windowRef;

  const handleActive: MouseEventHandler = ({ target }) => {
    closeMenus();
    activate(windowRef);
    moveInFront(windowRef);
    if (isResizable) {
      if (Object.is(target, windowRef.current)) {
        console.log("We now branch into resize logic");
      }
    }
  };

  const handleChromeDrag: MouseEventHandler = (e) => {
    activate(windowRef);
    moveInFront(windowRef);
    handleMove(e);
  };

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
      onDragStart={handleDragStart}
      onMouseDown={handleActive}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={windowRef}
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
