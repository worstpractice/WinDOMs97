import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useOsRef } from "hooks/useOsRef";
import { useStayInSight } from "components/desktop/context-menu/hooks/useStayInSight";
import type { ReactNode } from "react";
import * as React from "react";
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
    <section className={styles.ContextMenu} id="ContextMenu" ref={contextMenuRef} style={{ left, top }}>
      <ul className={contentListStyle}>{children}</ul>
    </section>
  );
};
