import type { FC, MouseEventHandler } from "react";
import React from "react";
import styles from "./StartButton.module.css";

type Props = {
  isDepressed: boolean;
  onMouseDown: MouseEventHandler;
};

export const StartButton: FC<Props> = ({ isDepressed, onMouseDown }) => {
  const style = isDepressed ? `${styles.StartButton} ${styles.Depressed}` : styles.StartButton;

  return (
    <div className={style} id="StartButton" onMouseDown={onMouseDown}>
      <strong className={styles.Title}>Start</strong>
    </div>
  );
};
