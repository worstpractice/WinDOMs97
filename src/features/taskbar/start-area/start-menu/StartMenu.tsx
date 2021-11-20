import type { ReactNode } from 'react';
import { default as React } from 'react';
import { onRMB } from 'src/event-filters/onRMB';
import { Spine } from 'src/features/taskbar/start-area/start-menu/Spine';
import styles from './StartMenu.module.css';

type Props = {
  children: ReactNode;
};

export const StartMenu = ({ children }: Props) => {
  const handleContextMenu = onRMB<HTMLElement>((e) => {
    // NOTE: This is here because we want `StartMenu` to support showing a context menu.
    e.stopPropagation();
    // TODO: Get cracking on context menu `Alternative`s!
  });

  return (
    <section className={styles.StartMenu} onMouseDown={handleContextMenu}>
      <Spine />
      <ul className={styles.ContentList}>{children}</ul>
    </section>
  );
};
