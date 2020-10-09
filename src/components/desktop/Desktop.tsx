import { useMutableRef } from "hooks/useMutableRef";
import type { FC, MouseEventHandler } from "react";
import React from "react";
import { useStore } from "store";
import styles from "./Desktop.module.css";

type Props = {
  closeMenus: () => void;
  onContextMenu: () => void;
};

export const Desktop: FC<Props> = ({ children, closeMenus, onContextMenu }) => {
  const { activate, setLastClickPosition } = useStore();
  const desktopRef = useMutableRef();

  const handleContextMenu: MouseEventHandler = (e) => {
    setLastClickPosition({ x: e.clientX, y: e.clientY });
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
