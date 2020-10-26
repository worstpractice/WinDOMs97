import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import type { ReactNode } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import type { Kernel } from "typings/kernel/Kernel";
import styles from "./Taskbar.module.css";

const selector = ({ activate, closeMenus }: Kernel) => ({
  activate,
  closeMenus,
});

type Props = {
  children: ReactNode;
};

export const Taskbar: FC<Props> = ({ children }) => {
  const { activate, closeMenus } = useKernel(selector);
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
