import { useStartingDimensions } from "hooks/programs/useStartingDimensions";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import { default as React } from "react";
import type { FC } from "typings/FC";
import type { Loader } from "typings/Loader";
import styles from "./TaskMgr.module.css";

type Props = {
  getProcess: Loader;
};

export const TaskMgr: FC<Props> = ({ getProcess }) => {
  const { runningProcesses } = useKernel();
  const programRef = useOsRef<HTMLDivElement>();
  const process = getProcess(programRef);
  useStartingDimensions(process);

  return (
    <div className={styles.TaskMgr} ref={programRef}>
      <p>PID | Filename</p>
      <ul>
        {runningProcesses.map((process) => {
          return (
            <p style={{ marginLeft: 15 }}>
              {process.pid} | {process.binaryImage.fileName}
            </p>
          );
        })}
      </ul>
    </div>
  );
};
