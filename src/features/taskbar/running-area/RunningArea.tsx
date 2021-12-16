import type { ReactNode } from 'react';
import { default as React, useRef } from 'react';
import { useIsRunningAreaFull } from 'src/hooks/taskbar/useIsRunningAreaFull';
import { css } from 'src/utils/as/css';

type Props = {
  readonly children: ReactNode;
};

export const RunningArea = ({ children }: Props) => {
  const runningAreaRef = useRef<HTMLElement>(null);
  useIsRunningAreaFull(runningAreaRef);

  return (
    <section style={styles.RunningArea} ref={runningAreaRef}>
      {children}
    </section>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  RunningArea: css({
    display: 'flex',
    flex: '1',
    flexDirection: 'row',
    gap: '12px',
    height: '100%',
    paddingBottom: '2px',
    paddingTop: '2px',
  } as const),
} as const;
