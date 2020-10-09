import type { FC } from "react";
import React from "react";
import { css } from "utils/css";
import styles from "./StartButton.module.css";

type Props = {
  isPressed: boolean;
  onMouseDown: () => void;
};

export const StartButton: FC<Props> = ({ isPressed, onMouseDown }) => {
  const style = isPressed ? css(styles.StartButton, styles.Pressed) : styles.StartButton;

  return (
    <button className={style} id="StartButton" onMouseDown={onMouseDown} type="button">
      <p className={styles.Title}>Start</p>
    </button>
  );
};
