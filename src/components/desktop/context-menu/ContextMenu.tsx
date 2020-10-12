import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useDomRef } from "hooks/useDomRef";
import { useKernel } from "kernel";
import type { FC } from "react";
import React from "react";
import styles from "./ContextMenu.module.css";

type Props = {};

export const ContextMenu: FC<Props> = ({ children }) => {
  const { lastClickPosition, activate } = useKernel();
  const contextMenuRef = useDomRef<HTMLElement>();
  useActivateOnMount(contextMenuRef);

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
