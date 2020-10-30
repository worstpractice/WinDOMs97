import { useOsRef } from "hooks/useOsRef";
import type { ReactNode } from "react";
import { default as React } from "react";
import { useActiveState } from "state/useActiveState";
import { useMenuState } from "state/useMenuState";
import type { FC } from "typings/FC";
import type { ActiveState } from "typings/state/ActiveState";
import type { MenuState } from "typings/state/MenuState";
import styles from "./Taskbar.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activate }: ActiveState) => ({
  activate,
});

const fromMenu = ({ closeMenus }: MenuState) => ({
  closeMenus,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  children: ReactNode;
};

export const Taskbar: FC<Props> = ({ children }) => {
  const { activate } = useActiveState(fromActive);
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
