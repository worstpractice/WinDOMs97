import { programs } from "binaries";
import { Pids } from "kernel/Pids";
import { is } from "type-predicates/is";
import { isNull } from "type-predicates/isNull";
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
  pidsToProcesses: Map<number, Process>;
  runningProcesses: readonly Process[];
  /////////////////////////////////////
  lastClickPosition: Position;
  /////////////////////////////////////
};

type SystemCalls = {
  activate: <T extends OsRef<HTMLElement>>(to: T) => void;
  endProcess: (process: Process) => void;
  executeBinary: (binary: Binary) => void;
  getProcessByPid: (pid: number, cb: (result: Process | null) => void) => void;
  setLastClickPosition: (to: Position) => void;
};

type State = KernelData & SystemCalls;

let debugLogCounter = 0;

export const useKernel = create<State>(
  devtools(
    combine<KernelData, SystemCalls>(
      {
        /////////////////////////////////////
        activeRef: { current: null },
        /////////////////////////////////////
        availablePids: Pids.available,
        installedBinaries: programs,
        pidsToProcesses: new Map<number, Process>(),
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
            set(({ pidsToProcesses, runningProcesses }) => {
              const sparedProcesses: Process[] = runningProcesses.filter(({ pid }) => {
                // We spare every process whose `pid` is NOT the `targetPid`.
                return pid !== targetPid;
              });

              pidsToProcesses.delete(targetPid);

              // Just like in C, thou shalt remember to free.
              Pids.free(targetPid);

              return { runningProcesses: sparedProcesses } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          executeBinary(binary: Binary) {
            set(({ pidsToProcesses, runningProcesses }) => {
              const pid = Pids.use();

              if (isNull(pid)) {
                console.error("OUT OF PIDS! Kill some processes first.");
                return { runningProcesses } as const;
              }

              const spawnedProcess: Process = {
                ...binary,

                notificationItemRef: { current: null },

                pid,

                runningItemRef: { current: null },

                windowRef: { current: null },
              } as const;

              pidsToProcesses.set(pid, spawnedProcess);

              console.log([...pidsToProcesses].sort());

              return { runningProcesses: [...runningProcesses, spawnedProcess] } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          getProcessByPid(pid: number, cb: (result: Process | null) => void) {
            set(({ pidsToProcesses }) => {
              const process = pidsToProcesses.get(pid) ?? null;

              cb(process);

              return { pidsToProcesses } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          setLastClickPosition({ x, y }: Position) {
            set(() => {
              return { lastClickPosition: { x, y } } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } as const),
    ),
  ),
);
