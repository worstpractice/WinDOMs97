import type { ReactNode } from 'react';
import { default as React } from 'react';
import { onRmb } from 'src/event-filters/onRmb';
import { Spine } from 'src/features/taskbar/start-area/start-menu/Spine';
import { INTERACTIVE } from 'src/styles/INTERACTIVE';
import { css } from 'src/utils/as/css';

type Props = {
  readonly children: ReactNode;
};

export const StartMenu = ({ children }: Props) => {
  const handleContextMenu = onRmb<HTMLElement>((event) => {
    // NOTE: This is here because we want `StartMenu` to support showing a context menu.
    event.stopPropagation();
    // TODO: Get cracking on context menu `Alternative`s!
  });

  return (
    <section style={styles.StartMenu} onMouseDown={handleContextMenu}>
      <Spine />
      <ul style={styles.ContentList}>{children}</ul>
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
    width: '100%',
    ...INTERACTIVE,
  } as const),

  StartMenu: css({
    backgroundColor: 'var(--oswindow-background)',
    bottom: 'var(--taskbar-height)',
    display: 'flex',
    left: 'var(--taskbar-padding-left)',
    maxHeight: '720px',
    maxWidth: '440px',
    outlineColor: 'var(--oswindow-outline)',
    outlineStyle: 'inset',
    outlineWidth: '4px',
    position: 'absolute',
    width: '100%',
    zIndex: 40,
    ...INTERACTIVE,
  } as const),
} as const;
