import { useOsRef } from "hooks/useOsRef";
import type { ReactNode } from "react";
import { default as React } from "react";
import { useActiveState } from "state/useActiveState";
import type { MenuState } from "state/useMenuState";
import { useMenuState } from "state/useMenuState";
import type { FC } from "typings/FC";
import styles from "./Taskbar.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fromMenu = ({ closeMenus }: MenuState) => ({
  closeMenus,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  children: ReactNode;
};

export const Taskbar: FC<Props> = ({ children }) => {
  const { activate } = useActiveState();
  const { closeMenus } = useMenuState(fromMenu);
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
