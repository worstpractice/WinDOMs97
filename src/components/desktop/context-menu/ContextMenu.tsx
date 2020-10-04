import { useOnMouseDownOutside } from "hooks/useOnMouseDownOutside";
import type { CSSProperties, FC } from "react";
import React, { useRef } from "react";
import styles from "./ContextMenu.module.css";

type Props = {
  coordinates: { x: number; y: number };
  onMouseDownOutside: EventListener;
};

export const ContextMenu: FC<Props> = ({ children, coordinates, onMouseDownOutside }) => {
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  useOnMouseDownOutside(contextMenuRef, onMouseDownOutside);

  return (
    <div className={styles.ContextMenu} style={{ left: coordinates.x, top: coordinates.y }} ref={contextMenuRef}>
      <div className={styles.ContentList}>{children}</div>
    </div>
  );
};
