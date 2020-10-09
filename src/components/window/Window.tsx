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
import { is } from "utils/is";
import { moveInFront } from "utils/moveInFront";
import styles from "./Window.module.css";

type Props = {
  onMouseDown: () => void;
  process: Process;
};

export const Window: FC<Props> = ({ onMouseDown, process }) => {
  const { activeRef, activate } = useStore();
  const windowRef = useMutableRef();
  const handleMove = useOnMoveWindow(windowRef);
  process.windowRef = windowRef;

  const handleActive = () => {
    activate(windowRef);
    moveInFront(windowRef);
    onMouseDown();
  };

  const handleChromeDrag: MouseEventHandler = (e) => {
    activate(windowRef);
    handleMove(e);
  };

  const isActive = is(activeRef, windowRef);

  const { icon, name } = process;

  return (
    <article className={styles.Window} onDragStart={handleDragStart} onMouseDown={handleActive} ref={windowRef}>
      <span onMouseDown={handleChromeDrag}>
        <ChromeArea isActive={isActive}>
          <WindowTitle icon={icon} isActive={isActive} name={name} />
          <WindowButtons process={process} />
        </ChromeArea>
      </span>

      <ProgramArea>
        <p>This is where the actual program goes</p>
      </ProgramArea>
    </article>
  );
};
