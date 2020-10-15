import { onLMB } from "event-filters/onLMB";
import { onRMB } from "event-filters/onRMB";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useDomRef } from "hooks/useDomRef";
import { useKernel } from "kernel";
import type { FC } from "react";
import * as React from "react";
import styles from "./Desktop.module.css";

type Props = {
  closeMenus: () => void;
  onContextMenu: () => void;
};

export const Desktop: FC<Props> = ({ children, closeMenus, onContextMenu }) => {
  const { activate, setLastClickPosition } = useKernel();
  const desktopRef = useDomRef<HTMLElement>();

  // NOTE: this call is what allows the children calling `useActivateOnMount()` to work properly.
  useActivateOnMount(desktopRef);

  const handleContextMenu = onRMB<HTMLElement>(({ clientX, clientY }) => {
    setLastClickPosition({ x: clientX, y: clientY });
    onContextMenu();
  });

  const handleMouseDown = onLMB<HTMLElement>(() => {
    closeMenus();
    activate(desktopRef);
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
    </main>
  );
};
