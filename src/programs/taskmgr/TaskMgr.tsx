import { useStartingDimensions } from "hooks/programs/useStartingDimensions";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import { useKernelState } from "state/useKernelState";
import type { FC } from "typings/FC";
import type { Loader } from "typings/Loader";
import type { KernelState } from "typings/state/KernelState";
import styles from "./TaskMgr.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = ({ endProcess, runningProcesses }: KernelState) => ({
  endProcess,
  runningProcesses,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getProcess: Loader;
};

export const TaskMgr: FC<Props> = ({ getProcess }) => {
  const { endProcess, runningProcesses } = useKernelState(fromKernel);
  const taskMgrRef = useOsRef<HTMLDivElement>();
  const process = getProcess(taskMgrRef);
  useStartingDimensions(process);

  return (
    <div className={styles.TaskMgr} ref={taskMgrRef}>
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
