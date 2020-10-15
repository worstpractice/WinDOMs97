import { programs } from "binaries";
import { Pids } from "kernel/Pids";
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
            set((state) => {
              const { activeRef } = state;

              console.groupCollapsed(`${++debugLogCounter}. State Changed `);
              console.debug("FROM:", activeRef.current);
              console.debug("TO:", current);
              console.groupEnd();

              activeRef.current = current;
              return state;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          endProcess({ pid: targetPid }: Process) {
            set((state) => {
              const { runningProcesses } = state;

              state.runningProcesses = runningProcesses.filter(({ pid }) => {
                // We spare every process whose `pid` is NOT the `targetPid`.
                return pid !== targetPid;
              });

              // Just like in C, thou shalt remember to free.
              Pids.free(targetPid);

              return state;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          executeBinary(binary: Binary) {
            set((state) => {
              const spawnedProcess: Process = {
                ...binary,

                isMinimized: false,

                notificationItemRef: { current: null },

                pid: Pids.use(),

                runningItemRef: { current: null },

                windowRef: { current: null },
              } as const;

              const { runningProcesses } = state;

              // TODO: Spend a bunch of time designing some intricate footgun just to avoid creating this extra array on every call.
              state.runningProcesses = [...runningProcesses, spawnedProcess];

              return state;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          setLastClickPosition({ x, y }: Position) {
            set((state) => {
              const { lastClickPosition } = state;

              lastClickPosition.x = x;
              lastClickPosition.y = y;

              return state;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } as const),
    ),
  ),
);
