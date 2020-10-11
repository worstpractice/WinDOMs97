import { programs } from "binaries";
import { Pids } from "kernel/Pids";
import type { MutableRefObject } from "react";
import type { Binary } from "typings/Binary";
import type { Position } from "typings/Position";
import type { Process } from "typings/Process";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

type Data = {
  /////////////////////////////////////
  activeRef: MutableRefObject<HTMLDivElement | null>;
  /////////////////////////////////////
  availablePids: readonly number[];
  installedBinaries: readonly Binary[];
  runningProcesses: readonly Process[];
  /////////////////////////////////////
  lastClickPosition: Position;
  /////////////////////////////////////
};

type Actions = {
  activate: (to: MutableRefObject<HTMLDivElement | null>) => void;
  endProcess: (process: Process) => void;
  executeBinary: (binary: Binary) => void;
  setLastClickPosition: (to: Position) => void;
};

type State = Data & Actions;

let debugLogCounter = 0;

export const useStore = create<State>(
  devtools(
    combine<Data, Actions>(
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
          activate({ current }: MutableRefObject<HTMLDivElement | null>) {
            set(({ activeRef }) => {
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
              const sparedProcesses = runningProcesses.filter(({ pid }) => {
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
              const spawnedProcess = {
                ...binary,

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
          setLastClickPosition(to: Position) {
            set(() => {
              return { lastClickPosition: to } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } as const),
    ),
  ),
);
