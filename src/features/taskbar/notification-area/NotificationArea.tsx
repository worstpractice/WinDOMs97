import type { ReactNode } from 'react';
import { default as React } from 'react';
import { Divider } from 'src/components/Divider';
import { Clock } from 'src/features/taskbar/notification-area/Clock';
import styles from './NotificationArea.module.css';

type Props = {
  children: ReactNode;
};

export const NotificationArea = ({ children }: Props) => {
  return (
    <section className={styles.Wrapper}>
      <Divider dent="in" direction="vertical" />
      <section className={styles.NotificationArea}>
        <aside className={styles.Icons}>{children}</aside>
        <Clock />
      </section>
    </section>
  );
};
