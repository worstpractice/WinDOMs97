import { programs } from "binaries";
import { Pids } from "kernel/Pids";
import { is } from "type-predicates/is";
import type { Binary } from "typings/Binary";
import type { OsRef } from "typings/OsRef";
import type { Position } from "typings/Position";
import type { Process } from "typings/Process";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

type KernelData = {
  /////////////////////////////////////
  activeRef: OsRef<HTMLElement>;
  /////////////////////////////////////
  availablePids: readonly number[];
  installedBinaries: readonly Binary[];
  runningProcesses: readonly Process[];
  /////////////////////////////////////
  lastClickPosition: Position;
  /////////////////////////////////////
};

type SysCalls = {
  activate: <T extends OsRef<HTMLElement>>(to: T) => void;
  endProcess: (process: Process) => void;
  executeBinary: (binary: Binary) => void;
  setLastClickPosition: (to: Position) => void;
};

type State = KernelData & SysCalls;

let debugLogCounter = 0;

export const useKernel = create<State>(
  devtools(
    combine<KernelData, SysCalls>(
      {
        /////////////////////////////////////
        activeRef: { current: null },
        /////////////////////////////////////
        availablePids: Pids.available,
        installedBinaries: programs,
        runningProcesses: [],
        /////////////////////////////////////
        lastClickPosition: { x: 0, y: 0 },
        /////////////////////////////////////
      } as const,

      (set) =>
        ({
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          activate<T extends OsRef<HTMLElement>>({ current }: T) {
            set(({ activeRef }) => {
              if (is(activeRef.current, current)) {
                return { activeRef };
              }
              console.groupCollapsed(`${++debugLogCounter}. State Changed `);
              console.debug("FROM:", activeRef.current);
              console.debug("TO:", current);
              console.groupEnd();

              return { activeRef: { current } } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          endProcess({ pid: targetPid }: Process) {
            set(({ runningProcesses }) => {
              const sparedProcesses: Process[] = runningProcesses.filter(({ pid }) => {
                // We spare every process whose `pid` is NOT the `targetPid`.
                return pid !== targetPid;
              });

              // Just like in C, thou shalt remember to free.
              Pids.free(targetPid);

              return { runningProcesses: sparedProcesses } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          executeBinary(binary: Binary) {
            set(({ runningProcesses }) => {
              const spawnedProcess: Process = {
                ...binary,

                isMaximized: false,

                isMinimized: false,

                notificationItemRef: { current: null },

                pid: Pids.use(),

                runningItemRef: { current: null },

                windowRef: { current: null },
              } as const;

              return { runningProcesses: [...runningProcesses, spawnedProcess] } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          setLastClickPosition({ x, y }: Position) {
            set(({ lastClickPosition }) => {
              lastClickPosition.x = x;
              lastClickPosition.y = y;
              return { lastClickPosition } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } as const),
    ),
  ),
);
