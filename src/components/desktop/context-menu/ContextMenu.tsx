import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useDomRef } from "hooks/useDomRef";
import { useKernel } from "kernel";
import type { ReactNode } from "react";
import * as React from "react";
import type { FC } from "typings/FC";
import styles from "./ContextMenu.module.css";

type Props = {
  children: ReactNode;
};

export const ContextMenu: FC<Props> = ({ children }) => {
  const { activate, lastClickPosition } = useKernel();
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
