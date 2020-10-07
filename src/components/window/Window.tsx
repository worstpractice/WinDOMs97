import { ChromeArea } from "components/window/chrome-area/ChromeArea";
import { WindowButtons } from "components/window/chrome-area/WindowButtons";
import { WindowTitle } from "components/window/chrome-area/WindowTitle";
import { ProgramArea } from "components/window/program-area/ProgramArea";
import { useOnMove } from "hooks/useOnMove";
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
  const handleMove = useOnMove(windowRef);

  const handleActive: MouseEventHandler = (e) => {
    setActiveWidget("Window");
    e.stopPropagation();
  };

  const handleChromeDrag: MouseEventHandler = (e) => {
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
