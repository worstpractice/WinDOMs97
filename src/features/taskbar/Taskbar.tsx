import { useOsRef } from 'hooks/useOsRef';
import type { ReactNode } from 'react';
import { useActiveState } from 'state/useActiveState';
import { useMenuState } from 'state/useMenuState';
import type { ActiveState } from 'typings/state/ActiveState';
import type { MenuState } from 'typings/state/MenuState';
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
