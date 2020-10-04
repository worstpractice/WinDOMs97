import { useOnMouseDownOutside } from "hooks/useOnMouseDownOutside";
import type { FC, MouseEventHandler } from "react";
import React, { useRef } from "react";
import styles from "./Desktop.module.css";

type Props = {
  onMouseDown: MouseEventHandler;
  onMouseDownOutside: EventListener;
  onContextMenu: MouseEventHandler;
};

export const Desktop: FC<Props> = ({ children, onContextMenu, onMouseDown, onMouseDownOutside }) => {
  const desktopRef = useRef<HTMLDivElement | null>(null);
  useOnMouseDownOutside(desktopRef, onMouseDownOutside);

  return (
    <div className={styles.Desktop} id="Desktop" onContextMenu={onContextMenu} onMouseDown={onMouseDown} ref={desktopRef}>
      {children}
    </div>
  );
};
