import { useMutableRef } from "hooks/useMutableRef";
import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import styles from "./Taskbar.module.css";

type Props = {
  closeMenus: () => void;
};

export const Taskbar: FC<Props> = ({ children, closeMenus }) => {
  const { activate } = useStore();
  const taskbarRef = useMutableRef();

  const handleActive = () => {
    closeMenus();
    activate(taskbarRef);
  };

  return (
    <footer className={styles.Taskbar} onMouseDown={handleActive} ref={taskbarRef}>
      {children}
    </footer>
  );
};
