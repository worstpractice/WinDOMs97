import { useIsRunningAreaFull } from 'hooks/taskbar/useIsRunningAreaFull';
import { useOsRef } from 'hooks/useOsRef';
import type { ReactNode } from 'react';
import styles from './RunningArea.module.css';

type Props = {
  children: ReactNode;
};

export const RunningArea = ({ children }: Props) => {
  const runningAreaRef = useOsRef<HTMLElement>();
  useIsRunningAreaFull(runningAreaRef);

  return (
    <section className={styles.RunningArea} ref={runningAreaRef}>
      {children}
    </section>
  );
};
