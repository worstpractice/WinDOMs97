import { useStayInSight } from "hooks/context-menu/useStayInSight";
import { useActivateOnMount } from "hooks/useActivateOnMount";
import { useOsRef } from "hooks/useOsRef";
import type { ReactNode } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { css } from "utils/css";
import styles from "./ContextMenu.module.css";

const tooFarDownStyle = css(styles.ContentList, styles.Outside);

type Props = {
  children: ReactNode;
};

export const ContextMenu: FC<Props> = ({ children }) => {
  const contextMenuRef = useOsRef<HTMLElement>();
  const [isTooFarDown, { x: left, y: top }] = useStayInSight(contextMenuRef);
  useActivateOnMount(contextMenuRef);

  const contentListStyle = isTooFarDown ? tooFarDownStyle : styles.ContentList;

  return (
    <section className={styles.ContextMenu} ref={contextMenuRef} style={{ left, top }}>
      <ul className={contentListStyle}>{children}</ul>
    </section>
  );
};
