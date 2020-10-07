import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import styles from "./WindowButtons.module.css";

type Props = {
  process: Process;
};

export const WindowButtons: FC<Props> = ({ process }) => {
  const { endProcess, setActiveWidget } = useStore();

  const handleExit: MouseEventHandler = (e) => {
    setActiveWidget("Desktop");
    endProcess(process);
    e.stopPropagation();
  };

  return (
    <section className={styles.WindowButtons}>
      <button className={styles.Button} onMouseDown={() => console.log("minimize")} type="button">
        <p>
          <strong>_</strong>
        </p>
      </button>
      <button className={styles.Button} onMouseDown={() => console.log("maximize or restore down")} type="button">
        <p>
          <strong>#</strong>
        </p>
      </button>
      <button className={styles.Button} onMouseDown={handleExit} type="button">
        <p>
          <strong>X</strong>
        </p>
      </button>
    </section>
  );
};
