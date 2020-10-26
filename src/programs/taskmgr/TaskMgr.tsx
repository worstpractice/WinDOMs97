import { useStartingDimensions } from "hooks/programs/useStartingDimensions";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import { default as React } from "react";
import type { FC } from "typings/FC";
import type { Kernel } from "typings/kernel/Kernel";
import type { Loader } from "typings/Loader";
import styles from "./TaskMgr.module.css";

const selector = ({ endProcess, runningProcesses }: Kernel) => ({
  endProcess,
  runningProcesses,
});

type Props = {
  getProcess: Loader;
};

export const TaskMgr: FC<Props> = ({ getProcess }) => {
  const { endProcess, runningProcesses } = useKernel(selector);
  const programRef = useOsRef<HTMLDivElement>();
  const process = getProcess(programRef);
  useStartingDimensions(process);

  return (
    <div className={styles.TaskMgr} ref={programRef}>
      <ul className={styles.ProcessList}>
        {runningProcesses.map((process) => {
          const { binaryImage, pid } = process;
          const { name } = binaryImage;

          const handleMouseDown = () => {
            endProcess(process);
          };

          return (
            <span
              key={`OsWindow-${pid}-${name}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "30px", margin: "10px" }}
            >
              <p style={{ marginLeft: 15 }}>
                {process.pid} | {process.binaryImage.fileName}
              </p>
              <button className={styles.KillButton} onMouseDown={handleMouseDown} type="button">
                KILL
              </button>
            </span>
          );
        })}
      </ul>
    </div>
  );
};
