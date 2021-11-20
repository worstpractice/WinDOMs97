import { Divider } from 'components/Divider';
import { Clock } from 'features/taskbar/notification-area/Clock';
import type { ReactNode } from 'react';
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
