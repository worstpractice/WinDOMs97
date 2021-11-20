import type { ReactNode } from 'react';
import { default as React } from 'react';
import { useStayInSight } from 'src/hooks/context-menu/useStayInSight';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import { useOsRef } from 'src/hooks/useOsRef';
import { css } from 'src/utils/css';
import styles from './ContextMenu.module.css';

const tooFarDownStyle = css(styles.ContentList ?? '', styles.Outside ?? '');

type Props = {
  children: ReactNode;
};

export const ContextMenu = ({ children }: Props) => {
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
