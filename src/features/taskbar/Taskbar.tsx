import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import type { ReactNode } from "react";
import * as React from "react";
import type { FC } from "typings/FC";
import styles from "./Taskbar.module.css";

type Props = {
  children: ReactNode;
};

export const Taskbar: FC<Props> = ({ children }) => {
  const { activate, closeMenus } = useKernel();
  const taskbarRef = useOsRef<HTMLElement>();

  const handleMouseDown = () => {
    closeMenus();
    activate(taskbarRef);
  };

  return (
    <footer className={styles.Taskbar} onMouseDown={handleMouseDown} ref={taskbarRef}>
      {children}
    </footer>
  );
};
