import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import styles from "./RunningItem.module.css";

type Props = {
  process: Process;
};

export const RunningItem: FC<Props> = ({ process }) => {
  const { activeWidget, setActiveWidget } = useStore();

  const handleActive: MouseEventHandler = (e) => {
    setActiveWidget("Window");
    e.stopPropagation();
  };

  const { icon, name } = process;

  const style = activeWidget === "Window" ? css(styles.RunningItem, styles.Active) : styles.RunningItem;

  return (
    <button className={style} onMouseDown={handleActive} type="button">
      <img alt={name} className={styles.Icon} src={icon} />
      <p className={styles.Title}>{name}</p>
    </button>
  );
};
