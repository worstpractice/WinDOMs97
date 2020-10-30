import { OsButton } from "components/OsButton";
import { onLMB } from "event-filters/onLMB";
import { useStartingDimensions } from "hooks/programs/useStartingDimensions";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import { useActiveState } from "state/useActiveState";
import { useKernelState } from "state/useKernelState";
import { useMenuState } from "state/useMenuState";
import type { FC } from "typings/FC";
import type { Loader } from "typings/Loader";
import type { Process } from "typings/Process";
import type { ActiveState } from "typings/state/ActiveState";
import type { KernelState } from "typings/state/KernelState";
import type { MenuState } from "typings/state/MenuState";
import { bringToFront } from "utils/bringToFront";
import { byPid } from "utils/sort/byPid";
import styles from "./TaskMgr.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activate }: ActiveState) => ({
  activate,
});

const fromKernel = ({ endProcess, runningProcesses }: KernelState) => ({
  endProcess,
  runningProcesses,
});

const fromMenu = ({ closeMenus }: MenuState) => ({
  closeMenus,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getProcess: Loader;
};

export const TaskMgr: FC<Props> = ({ getProcess }) => {
  const { activate } = useActiveState(fromActive);
  const { endProcess, runningProcesses } = useKernelState(fromKernel);
  const { closeMenus } = useMenuState(fromMenu);
  const taskMgrRef = useOsRef<HTMLDivElement>();
  const process = getProcess(taskMgrRef);
  useStartingDimensions(process);

  // @ts-expect-error As mutable...
  const mutableTemp: Process[] = runningProcesses;

  // ...and then back to immutable (after sorting).
  const orderedByPID: readonly Process[] = mutableTemp.sort(byPid);

  return (
    <div className={styles.TaskMgr} ref={taskMgrRef}>
      <ul className={styles.ProcessList}>
        {orderedByPID.map((process) => {
          const { binaryImage, pid } = process;
          const { name } = binaryImage;

          const handleKill = () => {
            endProcess(process);
          };

          const handleMouseDown = onLMB((e) => {
            // NOTE: This is required to successfully activate the `OsWindow` in question.
            e.stopPropagation();

            const { osWindowRef } = process;

            closeMenus();
            activate(osWindowRef);
            bringToFront(osWindowRef);
          });

          return (
            <li className={styles.Task} key={`OsWindow-${pid}-${name}`}>
              <p onMouseDown={handleMouseDown}>{process.pid}</p>
              <p onMouseDown={handleMouseDown}>{process.binaryImage.fileName}</p>
              <OsButton className={styles.KillButton} onMouseUp={handleKill}>
                KILL
              </OsButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
