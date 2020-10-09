import { useMutableRef } from "hooks/useMutableRef";
import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import styles from "./ContextMenu.module.css";

type Props = {};

export const ContextMenu: FC<Props> = ({ children }) => {
  const { lastClickPosition, activate } = useStore();
  const contextMenuRef = useMutableRef();

  const handleActive = () => {
    activate(contextMenuRef);
  };

  const { x, y } = lastClickPosition;

  return (
    <section
      className={styles.ContextMenu}
      id="ContextMenu"
      onMouseDown={handleActive}
      ref={contextMenuRef}
      style={{ left: x, top: y }}
    >
      <ul className={styles.ContentList}>{children}</ul>
    </section>
  );
};
