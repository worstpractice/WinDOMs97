import { ChromeArea } from "components/window/chrome-area/ChromeArea";
import { WindowButtons } from "components/window/chrome-area/WindowButtons";
import { WindowTitle } from "components/window/chrome-area/WindowTitle";
import { ProgramArea } from "components/window/program-area/ProgramArea";
import { useOnMoveWindow } from "hooks/useOnMoveWindow";
import type { FC, MouseEventHandler } from "react";
import React, { useRef } from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import { handleDragStart } from "utils/handleDragStart";
import styles from "./Window.module.css";

type Props = {
  process: Process;
};

export const Window: FC<Props> = ({ process }) => {
  const { activeWidget, setActiveWidget } = useStore();
  const windowRef = useRef<HTMLDivElement | null>(null);
  const handleMove = useOnMoveWindow(windowRef);

  const handleActive: MouseEventHandler = (e) => {
    e.stopPropagation();
    setActiveWidget("Window");
    // Places the most recently moved Window "on top" of all the Windows
    windowRef.current?.parentElement?.lastElementChild?.after(windowRef.current);
  };

  const handleChromeDrag: MouseEventHandler = (e) => {
    e.stopPropagation();
    setActiveWidget("Window");
    handleMove(e);
  };

  const isActive = activeWidget === "Window";

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
