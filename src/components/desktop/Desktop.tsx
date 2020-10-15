import { onLMB } from "event-filters/onLMB";
import { onRMB } from "event-filters/onRMB";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useDomRef } from "hooks/useDomRef";
//import { useOnDragSelection } from "hooks/useOnDragSelection";
import { useKernel } from "kernel";
import type { ReactNode } from "react";
import * as React from "react";
import type { FC } from "typings/FC";
import styles from "./Desktop.module.css";

type Props = {
  closeMenus: () => void;
  onContextMenu: () => void;
  children: ReactNode;
};

export const Desktop: FC<Props> = ({ children, closeMenus, onContextMenu }) => {
  const { activate } = useKernel();
  const desktopRef = useDomRef<HTMLElement>();
  //const handleDragSelection = useOnDragSelection(desktopRef);

  // NOTE: this call is what allows the children calling `useActivateOnMount()` to function properly.
  useActivateOnMount(desktopRef);

  const handleContextMenu = onRMB<HTMLElement>(() => {
    onContextMenu();
  });

  const handleMouseDown = onLMB<HTMLElement>((e) => {
    closeMenus();
    activate(desktopRef);
    //handleDragSelection(e);
  });

  return (
    <main
      className={styles.Desktop}
      id="Desktop"
      onContextMenu={handleContextMenu}
      onDoubleClickCapture={console.log}
      onMouseDown={handleMouseDown}
      ref={desktopRef}
    >
      {children}
      {/* {<DragSelection />} */}
    </main>
  );
};
