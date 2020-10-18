import { Pids } from "kernel/Pids";
import { programs } from "programs";
import { is } from "type-predicates/is";
import { isNull } from "type-predicates/isNull";
import type { Alternative } from "typings/Alternative";
import type { Binary } from "typings/Binary";
import type { MenuState } from "typings/MenuState";
import type { OsRef } from "typings/OsRef";
import type { Position } from "typings/Position";
import type { Process } from "typings/Process";
import type { Program } from "typings/Program";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

type UserState = {
  activeRef: OsRef<HTMLElement>;
  openMenu: MenuState;
  lastClickPosition: Position;
};

type KernelState = {
  availablePids: readonly number[];
  installedPrograms: readonly Binary[];
  floppyDiscs: readonly Program[];
  alternatives: readonly Alternative[];
  runningProcesses: readonly Process[];
};

type WindowActions = {
  maximize: (process: Process) => void;
  minimize: (process: Process) => void;
  unMaximize: (process: Process) => void;
  unMinimize: (process: Process) => void;
};

type MenuActions = {
  closeMenus: () => void;
  openContextMenu: (alternatives: readonly Alternative[]) => void;
  toggleStartMenu: () => void;
};

type UserActions = {
  activate: <T extends OsRef<HTMLElement>>(to: T) => void;
  setLastClickPosition: (to: Position) => void;
};

type ControlActions = {
  endProcess: (process: Process) => void;
  executeBinary: (binary: Binary) => void;
  installProgram: (program: Program) => void;
};

type SystemCalls = MenuActions & ControlActions & UserActions & WindowActions;

type OsState = UserState & KernelState;

type OperatingSystem = OsState & SystemCalls;

let debugLogCounter = 0;

export const useKernel = create<OperatingSystem>(
  devtools(
    combine<OsState, SystemCalls>(
      {
        /////////////////////////////////////
        // USER STATE
        /////////////////////////////////////
        activeRef: { current: null },
        openMenu: "",
        lastClickPosition: { x: 0, y: 0 },
        /////////////////////////////////////
        // KERNEL STATE
        /////////////////////////////////////
        availablePids: Pids.available,
        floppyDiscs: programs,
        installedPrograms: [],
        alternatives: [],
        runningProcesses: [],
        /////////////////////////////////////
      } as const,

      (set) =>
        ({
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //* USER ACTIONS *
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          activate: <T extends OsRef<HTMLElement>>({ current }: T) => {
            set(({ activeRef }) => {
              if (is(activeRef.current, current)) {
                return { activeRef };
              }

              console.groupCollapsed(`${++debugLogCounter}.  ActiveRef Changed `);
              console.debug("FROM:", activeRef.current);
              console.debug("TO:", current);
              console.groupEnd();

              return { activeRef: { current } } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          setLastClickPosition: ({ x, y }: Position) => {
            set(() => {
              return { lastClickPosition: { x, y } } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //* CONTROL ACTIONS *
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
                desktopItemRef: { current: null },
                startMenuItemRef: { current: null },
                quickStartItemRef: { current: null },
                ////////////////////////////////////////////////////////
              } as const;

              return { installedPrograms: [...installedPrograms, executableFile] } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //* MENU ACTIONS *
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          closeMenus: () => {
            set(() => {
              return { openMenu: "" } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          openContextMenu: (rmbAlternatives: readonly Alternative[]) => {
            set(() => {
              // Store the alternatives in the store so it becomes available to ContextMenu from the other side

              return { openMenu: "ContextMenu", rmbAlternatives: [...rmbAlternatives] } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          toggleStartMenu: () => {
            set(({ openMenu }) => {
              return { openMenu: openMenu === "StartMenu" ? "" : "StartMenu" } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //* WINDOW ACTIONS *
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
