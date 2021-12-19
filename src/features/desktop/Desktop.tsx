import type { ReactNode } from 'react';
import { default as React, useRef } from 'react';
import { DragSelection } from 'src/features/desktop/DragSelection';
import { useDesktopAlternatives } from 'src/hooks/alternatives/useDesktopAlternatives';
import { useDragSelection } from 'src/hooks/desktop/useOnDragSelection';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import { useMenuState } from 'src/state/useMenuState';
import { INTERACTIVE } from 'src/styles/INTERACTIVE';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { onRmb } from 'src/utils/event-filters/onRmb';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromMenu = from<MenuState>().select('closeStartMenu', 'openContextMenu');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly children: ReactNode;
};

export const Desktop = ({ children }: Props) => {
  const { closeStartMenu, openContextMenu } = useMenuState(fromMenu);
  const desktopRef = useRef<HTMLElement>(null);
  const [isDragSelecting, currentPosition] = useDragSelection(desktopRef);
  const alternatives = useDesktopAlternatives();
  useActivateOnMount(desktopRef);

  const handleContextMenu = onRmb<HTMLElement>(({ target }) => {
    const { current: desktop } = desktopRef;

    if (target !== desktop) return;

    closeStartMenu();
    openContextMenu(alternatives);
  });

  return (
    <main style={styles.Desktop} onMouseDown={handleContextMenu} ref={desktopRef}>
      {children}
      {isDragSelecting && <DragSelection currentPosition={currentPosition} />}
    </main>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Desktop: css({
    backgroundColor: 'var(--desktop-wallpaper)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    ...INTERACTIVE,
  } as const),
} as const;
