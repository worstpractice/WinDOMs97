import { ChromeArea } from "components/window/chrome-area/ChromeArea";
import { WindowButtons } from "components/window/chrome-area/WindowButtons";
import { WindowTitle } from "components/window/chrome-area/WindowTitle";
import { ProgramArea } from "components/window/program-area/ProgramArea";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useMutableRef } from "hooks/useMutableRef";
import { useOnMoveWindow } from "hooks/useOnMoveWindow";
import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
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
  useActivateOnMount(windowRef);

  // NOTE: This is vital. This is the line where each process is provided with its own window handle.
  process.windowRef = windowRef;

  const handleActive = () => {
    closeMenus();
    activate(windowRef);
    moveInFront(windowRef);
  };

  const handleChromeDrag: MouseEventHandler = (e) => {
    activate(windowRef);
    moveInFront(windowRef);
    handleMove(e);
  };

  return (
    <article className={styles.Window} onDragStart={handleDragStart} onMouseDown={handleActive} ref={windowRef}>
      <span onMouseDown={handleChromeDrag}>
        <ChromeArea process={process}>
          <WindowTitle process={process} />
          <WindowButtons process={process} />
        </ChromeArea>
      </span>
      <ProgramArea>{children}</ProgramArea>
    </article>
  );
};
