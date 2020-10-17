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
  const { lastClickPosition } = useKernel();
  const contextMenuRef = useDomRef<HTMLElement>();
  useActivateOnMount(contextMenuRef);

  const { x: left, y: top } = lastClickPosition;

  return (
    <section
      className={styles.ContextMenu}
      id="ContextMenu"
      ref={contextMenuRef}
      style={{ left, top }}
    >
      <ul className={styles.ContentList}>{children}</ul>
    </section>
  );
};
