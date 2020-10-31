import { onRMB } from "event-filters/onRMB";
import { DragSelection } from "features/desktop/DragSelection";
import { useDesktopAlternatives } from "hooks/alternatives/useDesktopAlternatives";
import { useDragSelection } from "hooks/desktop/useOnDragSelection";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useOsRef } from "hooks/useOsRef";
import type { ReactNode } from "react";
import { default as React } from "react";
import { useMenuState } from "state/useMenuState";
import { is } from "type-predicates/is";
import type { FC } from "typings/FC";
import type { MenuState } from "typings/state/MenuState";
import styles from "./Desktop.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromMenu = ({ openContextMenu }: MenuState) => ({
  openContextMenu,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  children: ReactNode;
};

export const Desktop: FC<Props> = ({ children }) => {
  const { openContextMenu } = useMenuState(fromMenu);
  const desktopRef = useOsRef<HTMLElement>();
  const [isDragSelecting, currentPosition] = useDragSelection(desktopRef);
  const alternatives = useDesktopAlternatives();
  useActivateOnMount(desktopRef);

  const handleContextMenu = onRMB<HTMLElement>(({ target }) => {
    const { current: desktop } = desktopRef;

    if (!is(target, desktop)) return;

    openContextMenu(alternatives);
  });

  return (
    <main className={styles.Desktop} onContextMenu={handleContextMenu} ref={desktopRef}>
      {children}
      {isDragSelecting && <DragSelection currentPosition={currentPosition} />}
    </main>
  );
};
