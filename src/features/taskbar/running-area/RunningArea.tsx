import { useIsRunningAreaFull } from "hooks/taskbar/useIsRunningAreaFull";
import { useOsRef } from "hooks/useOsRef";
import type { ReactNode } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import styles from "./RunningArea.module.css";

type Props = {
  children: ReactNode;
};

export const RunningArea: FC<Props> = ({ children }) => {
  const runningAreaRef = useOsRef<HTMLElement>();
  useIsRunningAreaFull(runningAreaRef);

  return (
    <section className={styles.RunningArea} ref={runningAreaRef}>
      {children}
    </section>
  );
};
