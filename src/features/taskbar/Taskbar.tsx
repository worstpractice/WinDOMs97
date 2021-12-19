import type { ReactNode } from 'react';
import { default as React, useRef } from 'react';
import { useActiveState } from 'src/state/useActiveState';
import { useMenuState } from 'src/state/useMenuState';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { switchOn } from 'src/utils/event-filters/switchOn';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('setActiveRef');
const fromMenu = from<MenuState>().select('closeMenus');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly children: ReactNode;
};

export const Taskbar = ({ children }: Props) => {
  const { setActiveRef } = useActiveState(fromActive);
  const { closeMenus } = useMenuState(fromMenu);
  const taskbarRef = useRef<HTMLElement>(null);

  const handleLmb = (): void => {
    closeMenus();
    setActiveRef(taskbarRef);
  };

  return (
    <footer style={styles.Taskbar} onMouseDown={switchOn({ lmb: handleLmb })} ref={taskbarRef}>
      {children}
    </footer>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Taskbar: css({
    alignItems: 'center',
    backgroundColor: 'var(--gray)',
    bottom: 0,
    display: 'flex',
    gap: '10px',
    height: 'var(--taskbar-height)',
    justifyContent: 'center',
    left: 0,
    outlineColor: 'var(--oswindow-outline)',
    outlineStyle: 'inset',
    outlineWidth: '4px',
    paddingBottom: 'var(--taskbar-padding-elsewhere)',
    paddingLeft: 'var(--taskbar-padding-left)',
    paddingRight: 'var(--taskbar-padding-elsewhere)',
    paddingTop: 'var(--taskbar-padding-elsewhere)',
    position: 'absolute',
    right: 0,
    zIndex: 20,
  } as const),
} as const;
