import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import styles from "./Desktop.module.css";

type Props = {};

export const Desktop: FC<Props> = ({ children }) => {
  const { setActiveWidget, setLastClick } = useStore();

  const handleActive = () => {
    setActiveWidget("Desktop");
  };

  const handleContextMenu: MouseEventHandler = (e) => {
    setLastClick({ x: e.clientX, y: e.clientY });
    setActiveWidget("ContextMenu");
  };

  return (
    <main className={styles.Desktop} onContextMenu={handleContextMenu} onMouseDownCapture={handleActive}>
      {children}
    </main>
  );
};
