import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useMutableRef } from "hooks/useMutableRef";
import { useKernel } from "kernel";
import React, { FC, MouseEventHandler } from "react";
import styles from "./Desktop.module.css";

type Props = {
  closeMenus: () => void;
  onContextMenu: () => void;
};

export const Desktop: FC<Props> = ({ children, closeMenus, onContextMenu }) => {
  const { activate, setLastClickPosition } = useKernel();
  const desktopRef = useMutableRef();

  // NOTE: this call is what allows the child components calling `useActivateOnMount()` to work properly.
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
      ref={desktopRef}
    >
      {children}
    </main>
  );
};
