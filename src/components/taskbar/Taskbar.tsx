import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import styles from "./Taskbar.module.css";

type Props = {};

export const Taskbar: FC<Props> = ({ children }) => {
  const { setActiveWidget } = useStore();

  const handleActive: MouseEventHandler = (e) => {
    setActiveWidget("Taskbar");
    e.stopPropagation();
  };

  return (
    <footer className={styles.Taskbar} onMouseDown={handleActive}>
      {children}
    </footer>
  );
};
