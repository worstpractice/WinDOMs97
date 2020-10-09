import { ChromeArea } from "components/window/chrome-area/ChromeArea";
import { WindowButtons } from "components/window/chrome-area/WindowButtons";
import { WindowTitle } from "components/window/chrome-area/WindowTitle";
import { ProgramArea } from "components/window/program-area/ProgramArea";
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

export const Window: FC<Props> = ({ closeMenus, process }) => {
  const { activate } = useStore();
  const windowRef = useMutableRef();
  const handleMove = useOnMoveWindow(windowRef);
  process.windowRef = windowRef;

  const handleActive = () => {
    activate(windowRef);
    moveInFront(windowRef);
    closeMenus();
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
      <ProgramArea>
        <p>This is where the actual program goes</p>
      </ProgramArea>
    </article>
  );
};
