import type { ReactNode } from 'react';
import { default as React } from 'react';
import { Divider } from 'src/components/Divider';
import { Clock } from 'src/features/taskbar/notification-area/Clock';
import { css } from 'src/utils/as/css';

type Props = {
  readonly children: ReactNode;
};

export const NotificationArea = ({ children }: Props) => {
  return (
    <section style={styles.Wrapper}>
      <Divider dent="in" direction="vertical" />
      <section style={styles.NotificationArea}>
        <aside style={styles.Icons}>{children}</aside>
        <Clock />
      </section>
    </section>
  );
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
const styles = {
  Icons: css({
    display: 'flex',
    gap: '10px',
    marginLeft: '4px',
  } as const),

  NotificationArea: css({
    alignItems: 'center',
    display: 'flex',
    gap: '12px',
    height: '100%',
    justifyContent: 'center',
    outlineColor: 'var(--oswindow-outline)',
    outlineStyle: 'outset',
    outlineWidth: '2px',
  } as const),

  Wrapper: css({
    alignItems: 'center',
    display: 'flex',
    gap: '8px',
    height: '100%',
    justifyContent: 'center',
  } as const),
} as const;
