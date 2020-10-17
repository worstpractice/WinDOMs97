import { Pids } from "kernel/Pids";
import { programs } from "programs";
import { is } from "type-predicates/is";
import { isNull } from "type-predicates/isNull";
import type { Binary } from "typings/Binary";
import type { OsRef } from "typings/OsRef";
import type { Position } from "typings/Position";
import type { Process } from "typings/Process";
import type { Program } from "typings/Program";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

type KernelData = {
  /////////////////////////////////////
  activeRef: OsRef<HTMLElement>;
  /////////////////////////////////////
  availablePids: readonly number[];
  installedPrograms: readonly Binary[];
  floppyDiscs: readonly Program[];
  runningProcesses: readonly Process[];
  /////////////////////////////////////
  lastClickPosition: Position;
  /////////////////////////////////////
};

type SystemCalls = {
  activate: <T extends OsRef<HTMLElement>>(to: T) => void;
  endProcess: (process: Process) => void;
  executeBinary: (binary: Binary) => void;
  installProgram: (program: Program) => void;
  setLastClickPosition: (to: Position) => void;
  ////////////////////////////////////////////////////////
  maximize: (process: Process) => void;
  minimize: (process: Process) => void;
  unMaximize: (process: Process) => void;
  unMinimize: (process: Process) => void;
  ////////////////////////////////////////////////////////
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
        floppyDiscs: programs,
        installedPrograms: [],
        runningProcesses: [],
        /////////////////////////////////////
        lastClickPosition: { x: 0, y: 0 },
        /////////////////////////////////////
      } as const,

      (set) =>
        ({
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          activate: <T extends OsRef<HTMLElement>>({ current }: T) => {
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
          endProcess: ({ pid: targetPid }: Process) => {
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
          executeBinary: (binary: Binary) => {
            set(({ runningProcesses }) => {
              const pid = Pids.use();

              if (isNull(pid)) {
                console.error("OUT OF PIDS! Kill some processes first.");
                return { runningProcesses } as const;
              }

              const spawnedProcess: Process = {
                ////////////////////////////////////////////////////////
                ...binary,
                ////////////////////////////////////////////////////////
                pid,
                ////////////////////////////////////////////////////////
                isMaximized: false,
                isMinimized: false,
                ////////////////////////////////////////////////////////
                chromeAreaRef: { current: null },
                notificationItemRef: { current: null },
                runningItemRef: { current: null },
                osWindowRef: { current: null },
                ////////////////////////////////////////////////////////
              } as const;

              return { runningProcesses: [...runningProcesses, spawnedProcess] } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          installProgram: (program: Program) => {
            set(({ installedPrograms }) => {
              console.log(`Installed program ${program.name}`);
              const executableFile: Binary = {
                ////////////////////////////////////////////////////////
                ...program,
                ////////////////////////////////////////////////////////
                fileName: `${program.name.toLowerCase()}.exe`,
                ////////////////////////////////////////////////////////
                contextMenuItemRef: { current: null },
                desktopItemRef: { current: null },
                startMenuItemRef: { current: null },
                quickStartItemRef: { current: null },
                ////////////////////////////////////////////////////////
              } as const;

              return { installedPrograms: [...installedPrograms, executableFile] } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          maximize: (process: Process) => {
            set((store) => {
              process.isMaximized = true;

              return store;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          minimize: (process: Process) => {
            set((store) => {
              process.isMinimized = true;

              return store;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          setLastClickPosition: ({ x, y }: Position) => {
            set(({ lastClickPosition }) => {
              lastClickPosition.x = x;
              lastClickPosition.y = y;

              return { lastClickPosition } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          unMaximize: (process: Process) => {
            set((store) => {
              process.isMaximized = false;

              return store;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          unMinimize: (process: Process) => {
            set((store) => {
              process.isMinimized = false;

              return store;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } as const),
    ),
    "Kernel", // This names the store in the Redux DevTools.
  ),
);
