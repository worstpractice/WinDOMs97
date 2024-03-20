import type { ReactNode } from 'react';
import { default as React } from 'react';
import { Spine } from 'src/features/taskbar/start-area/start-menu/Spine';
import { INTERACTIVE } from 'src/styles/INTERACTIVE';
import type { MouseHandler } from 'src/typings/handlers/MouseHandler';
import { css } from 'src/utils/as/css';
import { switchOn } from 'src/utils/event-filters/switchOn';

type Props = {
  readonly children: ReactNode;
};

export const StartMenu = ({ children }: Props) => {
  const handleRmb: MouseHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    // TODO: Get cracking on context menu `Alternative`s!
  };

  return (
    <section style={styles.StartMenu} onMouseDown={switchOn({ rmb: handleRmb })}>
      <Spine />
      <ul style={styles.ContentList}>{children}</ul>
    </section>
  );
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
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
