import { onRMB } from "event-filters/onRMB";
import { DragSelection } from "screens/desktop/DragSelection";
import { useDesktopAlternatives } from "hooks/alternatives/useDesktopAlternatives";
import { useDragSelection } from "hooks/desktop/useOnDragSelection";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import type { ReactNode } from "react";
import { default as React } from "react";
import { is } from "type-predicates/is";
import type { FC } from "typings/FC";
import styles from "./Desktop.module.css";

type Props = {
  children: ReactNode;
};

export const Desktop: FC<Props> = ({ children }) => {
  const { openContextMenu } = useKernel();
  const desktopRef = useOsRef<HTMLElement>();
  const [isDragSelecting, currentPosition] = useDragSelection(desktopRef);
  const alternatives = useDesktopAlternatives();

  // NOTE: this call is what allows the children calling `useActivateOnMount()` to function properly.
  useActivateOnMount(desktopRef);

  // NOTE: This thing is allowed to (and expected) to grow quite a bit, since the `Desktop` is quite unique in RMB situations.
  const handleContextMenu = onRMB<HTMLElement>(({ target }) => {
    const { current: desktop } = desktopRef;

    // We're not interested if the target isn't the `Desktop`
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
