import { default as React } from 'react';
import { OsButton } from 'src/components/OsButton';
import { onLMB } from 'src/event-filters/onLMB';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useOsRef } from 'src/hooks/useOsRef';
import { useActiveState } from 'src/state/useActiveState';
import { useKernelState } from 'src/state/useKernelState';
import { useMenuState } from 'src/state/useMenuState';
import type { Loader } from 'src/typings/Loader';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { KernelState } from 'src/typings/state/KernelState';
import type { MenuState } from 'src/typings/state/MenuState';
import { byPid } from 'src/utils/array-helpers/sort/byPid';
import { bringToFront } from 'src/utils/bringToFront';
import { sortProcesses } from 'src/utils/sortImmutably';
import styles from './TaskMgr.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ setActiveRef }: ActiveState) => {
  return {
    setActiveRef,
  };
};

const fromKernel = ({ endProcess, runningProcesses }: KernelState) => {
  return {
    endProcess,
    runningProcesses,
  };
};

const fromMenu = ({ closeMenus }: MenuState) => {
  return {
    closeMenus,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getProcess: Loader;
};

export const TaskMgr = ({ getProcess }: Props) => {
  const { setActiveRef } = useActiveState(fromActive);
  const { endProcess, runningProcesses } = useKernelState(fromKernel);
  const { closeMenus } = useMenuState(fromMenu);
  const taskMgrRef = useOsRef<HTMLDivElement>();
  const process = getProcess(taskMgrRef);
  useStartingDimensions(process);

  // NOTE: This is a necessary step since `runningProcesses` is technically immutable.
  const orderedByPID = sortProcesses(runningProcesses, byPid);

  return (
    <div className={styles.TaskMgr} ref={taskMgrRef}>
      <ul className={styles.ProcessList}>
        {orderedByPID.map((process) => {
          const { binaryImage, pid } = process;
          const { programName } = binaryImage;

          const handleKill = () => {
            endProcess(process);
          };

          const handleMouseDown = onLMB<HTMLParagraphElement>((e) => {
            // NOTE: This is required to prevent the taskmgr's own `OsWindow` from immediately stealing back the focus.
            e.stopPropagation();

            const { osWindowRef } = process;

            closeMenus();
            setActiveRef(osWindowRef);
            bringToFront(osWindowRef);
          });

          return (
            <li className={styles.Task} key={`OsWindow-${pid}-${programName}`}>
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
