import type { ReactNode } from 'react';
import { default as React } from 'react';
import { useOsRef } from 'src/hooks/useOsRef';
import { useActiveState } from 'src/state/useActiveState';
import { useMenuState } from 'src/state/useMenuState';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { MenuState } from 'src/typings/state/MenuState';
import styles from './Taskbar.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ setActiveRef }: ActiveState) => {
  return {
    setActiveRef,
  };
};

const fromMenu = ({ closeMenus }: MenuState) => {
  return {
    closeMenus,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  children: ReactNode;
};

export const Taskbar = ({ children }: Props) => {
  const { setActiveRef } = useActiveState(fromActive);
  const { closeMenus } = useMenuState(fromMenu);
  const taskbarRef = useOsRef<HTMLElement>();

  const handleMouseDown = () => {
    closeMenus();
    setActiveRef(taskbarRef);
  };

  return (
    <footer className={styles.Taskbar} onMouseDown={handleMouseDown} ref={taskbarRef}>
      {children}
    </footer>
  );
};
