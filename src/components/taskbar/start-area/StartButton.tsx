import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import { css } from "utils/css";
import styles from "./StartButton.module.css";

type Props = {};

export const StartButton: FC<Props> = () => {
  const { activeWidget, setActiveWidget } = useStore();

  const toggleActive: MouseEventHandler = (e) => {
    e.stopPropagation();
    activeWidget === "StartMenu" ? setActiveWidget("Desktop") : setActiveWidget("StartMenu");
  };

  const style = activeWidget === "StartMenu" ? css(styles.StartButton, styles.Depressed) : styles.StartButton;

  return (
    <button className={style} id="StartButton" onMouseDown={toggleActive} type="button">
      <p className={styles.Title}>Start</p>
    </button>
  );
};
