import type { ReactNode } from 'react';
import { default as React } from 'react';
import { onRMB } from 'src/event-filters/onRMB';
import { DragSelection } from 'src/features/desktop/DragSelection';
import { useDesktopAlternatives } from 'src/hooks/alternatives/useDesktopAlternatives';
import { useDragSelection } from 'src/hooks/desktop/useOnDragSelection';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import { useOsRef } from 'src/hooks/useOsRef';
import { useMenuState } from 'src/state/useMenuState';
import type { MenuState } from 'src/typings/state/MenuState';
import styles from './Desktop.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromMenu = ({ openContextMenu }: MenuState) => {
  return {
    openContextMenu,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  children: ReactNode;
};

export const Desktop = ({ children }: Props) => {
  const { openContextMenu } = useMenuState(fromMenu);
  const desktopRef = useOsRef<HTMLElement>();
  const [isDragSelecting, currentPosition] = useDragSelection(desktopRef);
  const alternatives = useDesktopAlternatives();
  useActivateOnMount(desktopRef);

  const handleContextMenu = onRMB<HTMLElement>(({ target }) => {
    const { current: desktop } = desktopRef;

    if (target !== desktop) return;

    openContextMenu(alternatives);
  });

  return (
    <main className={styles.Desktop} onContextMenu={handleContextMenu} ref={desktopRef}>
      {children}
      {isDragSelecting && <DragSelection currentPosition={currentPosition} />}
    </main>
  );
};
