import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useMutableRef } from "hooks/useMutableRef";
import { useKernel } from "kernel";
import type { FC, MouseEventHandler } from "react";
import React from "react";
import styles from "./Desktop.module.css";

type Props = {
  closeMenus: () => void;
  onContextMenu: () => void;
};

export const Desktop: FC<Props> = ({ children, closeMenus, onContextMenu }) => {
  const { activate, setLastClickPosition } = useKernel();
  const desktopRef = useMutableRef();

  // NOTE: this call allows the children calling `useActivateOnMount()` to work properly.
  useActivateOnMount(desktopRef);

  const handleContextMenu: MouseEventHandler = ({ clientX, clientY }) => {
    setLastClickPosition({ x: clientX, y: clientY });
    onContextMenu();
  };

  const handleMouseDown = () => {
    closeMenus();
    activate(desktopRef);
  };

  return (
    <main
      className={styles.Desktop}
      id="Desktop"
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onDoubleClickCapture={console.log}
      ref={desktopRef}
    >
      {children}
    </main>
  );
};
