import type { ReactNode } from 'react';
import { default as React } from 'react';
import { useIsRunningAreaFull } from 'src/hooks/taskbar/useIsRunningAreaFull';
import { useOsRef } from 'src/hooks/useOsRef';
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
