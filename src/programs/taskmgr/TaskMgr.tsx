import { default as React, useRef } from 'react';
import { OsButton } from 'src/components/OsButton';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import { useActiveState } from 'src/state/useActiveState';
import { useKernelState } from 'src/state/useKernelState';
import { useMenuState } from 'src/state/useMenuState';
import type { Loader } from 'src/typings/Loader';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { KernelState } from 'src/typings/state/KernelState';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { bringToFront } from 'src/utils/bringToFront';
import { onLmb } from 'src/utils/event-filters/onLmb';
import { byPid } from 'src/utils/sort/byPid';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('setActiveRef');
const fromKernel = from<KernelState>().select('endProcess', 'runningProcesses');
const fromMenu = from<MenuState>().select('closeMenus');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly getProcess: Loader;
};

export const TaskMgr = ({ getProcess }: Props) => {
  const { setActiveRef } = useActiveState(fromActive);
  const { endProcess, runningProcesses } = useKernelState(fromKernel);
  const { closeMenus } = useMenuState(fromMenu);
  const programRef = useRef<HTMLDivElement>(null);
  const process = getProcess(programRef);
  useActivateOnMount(programRef);
  useStartingDimensions(process);

  return (
    <div style={styles.TaskMgr} ref={programRef}>
      <ul style={styles.ProcessList}>
        {[...runningProcesses].sort(byPid).map((process) => {
          const { binaryImage, pid } = process;
          const { fileName, programName } = binaryImage;

          const handleKill = (): void => {
            endProcess(process);
          };

          const handleMouseDown = onLmb<HTMLParagraphElement>((event): void => {
            // NOTE: This is required to prevent the taskmgr's own `OsWindow` from immediately stealing back the focus.
            event.stopPropagation();

            const { osWindowRef } = process;

            closeMenus();
            setActiveRef(osWindowRef);
            bringToFront(osWindowRef);
          });

          return (
            <li style={styles.Task} key={`OsWindow-${pid}-${programName}`}>
              <p onMouseDown={handleMouseDown}>{pid}</p>
              <p onMouseDown={handleMouseDown}>{fileName}</p>
              <OsButton style={styles.KillButton} onMouseUp={handleKill}>
                KILL
              </OsButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  KillButton: css({
    fontSize: '20px',
    height: '24px',
    width: '48px',
  } as const),

  ProcessList: css({
    // some styles
  } as const),

  Task: css({
    display: 'flex',
    gap: '30px',
    justifyContent: 'space-between',
    margin: '10px',
  } as const),

  TaskMgr: css({
    backgroundColor: 'var(--oswindow-background)',
    height: '100%',
    padding: '10px',
    width: '100%',
  } as const),
} as const;
