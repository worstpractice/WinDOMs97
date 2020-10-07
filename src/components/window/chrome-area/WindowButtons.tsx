import React, { FC, MouseEventHandler } from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import styles from "./WindowButtons.module.css";

type Props = {
  process: Process;
};

export const WindowButtons: FC<Props> = ({ process }) => {
  const { endProcess, setActiveWidget } = useStore();

  const handleMouseDown: MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  const handleExit: MouseEventHandler = (e) => {
    endProcess(process);
    setActiveWidget("Desktop");
    e.stopPropagation();
  };

  return (
    <section className={styles.WindowButtons}>
      {/* minimize */}
      <button className={styles.Button} type="button">
        _
      </button>
      {/* maximize or restore down */}
      <button className={styles.Button} type="button">
        #
      </button>
      {/* exit */}
      <button className={styles.Button} onMouseDown={handleMouseDown} onMouseUp={handleExit} type="button">
        X
      </button>
    </section>
  );
};
