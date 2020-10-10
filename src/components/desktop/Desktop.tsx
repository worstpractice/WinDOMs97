import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useMutableRef } from "hooks/useMutableRef";
import React, { FC, MouseEventHandler } from "react";
import { useStore } from "store";
import styles from "./Desktop.module.css";

type Props = {
  closeMenus: () => void;
  onContextMenu: () => void;
};

export const Desktop: FC<Props> = ({ children, closeMenus, onContextMenu }) => {
  const { activate, setLastClickPosition } = useStore();
  const desktopRef = useMutableRef();
  // NOTE: For React reasons, this call is what allows the child components calling `useActivateOnMount()` to work properly.
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
