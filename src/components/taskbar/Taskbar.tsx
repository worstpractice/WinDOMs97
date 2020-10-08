import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import styles from "./Taskbar.module.css";

type Props = {};

export const Taskbar: FC<Props> = ({ children }) => {
  const { setActiveWidget } = useStore();

  const handleActive: MouseEventHandler = (e) => {
    e.stopPropagation();
    setActiveWidget("Taskbar");
  };

  return (
    <footer className={styles.Taskbar} id="Taskbar" onMouseDown={handleActive}>
      {children}
    </footer>
  );
};
