import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useOsRef } from "hooks/useOsRef";
import { useStayInSight } from "hooks/desktop/context-menu/useStayInSight";
import type { ReactNode } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { css } from "utils/css";
import styles from "./ContextMenu.module.css";

type Props = {
  children: ReactNode;
};

export const ContextMenu: FC<Props> = ({ children }) => {
  const contextMenuRef = useOsRef<HTMLElement>();
  const [isTooFarDown, { x: left, y: top }] = useStayInSight(contextMenuRef);
  useActivateOnMount(contextMenuRef);

  const contentListStyle = isTooFarDown ? css(styles.ContentList, styles.Outside) : styles.ContentList;

  return (
    <section className={styles.ContextMenu} ref={contextMenuRef} style={{ left, top }}>
      <ul className={contentListStyle}>{children}</ul>
    </section>
  );
};
