import { useDomRef } from "hooks/useDomRef";
import { useKernel } from "kernel";
import type { ReactNode } from "react";
import * as React from "react";
import type { FC } from "typings/FC";
import styles from "./Taskbar.module.css";

type Props = {
  children: ReactNode;
  closeMenus: () => void;
};

export const Taskbar: FC<Props> = ({ children, closeMenus }) => {
  const { activate } = useKernel();
  const taskbarRef = useDomRef<HTMLElement>();

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
