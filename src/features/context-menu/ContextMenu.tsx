import type { ReactNode } from 'react';
import { default as React, useRef } from 'react';
import { useStayInSight } from 'src/hooks/context-menu/useStayInSight';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import { INTERACTIVE } from 'src/styles/INTERACTIVE';
import { css } from 'src/utils/as/css';

type Props = {
  readonly children: ReactNode;
};

export const ContextMenu = ({ children }: Props) => {
  const contextMenuRef = useRef<HTMLElement>(null);
  const [isTooFarDown, { x: left, y: top }] = useStayInSight(contextMenuRef);
  useActivateOnMount(contextMenuRef);

  const contentListStyle = isTooFarDown ? tooFarDownStyle : styles.ContentList;

  return (
    <section ref={contextMenuRef} style={{ ...styles.ContextMenu, left, top }}>
      <ul style={contentListStyle}>{children}</ul>
    </section>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  ContentList: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    ...INTERACTIVE,
  } as const),

  ContextMenu: css({
    backgroundColor: 'var(--oswindow-background)',
    outlineColor: 'var(--oswindow-outline)',
    outlineStyle: 'inset',
    outlineWidth: '4px',
    position: 'absolute',
    width: '350px',
    zIndex: '50',
    ...INTERACTIVE,
  } as const),

  Outside: css({
    flexDirection: 'column-reverse',
  } as const),
} as const;

const tooFarDownStyle = css({
  ...styles.ContentList,
  ...styles.Outside,
} as const);
