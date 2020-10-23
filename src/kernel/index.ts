import { Pids } from "kernel/Pids";
import { is } from "type-predicates/is";
import { isNull } from "type-predicates/isNull";
import type { Alternative } from "typings/Alternative";
import type { Binary } from "typings/Binary";
import type { MenuState } from "typings/MenuState";
import type { OsRef } from "typings/OsRef";
import type { Hash } from "typings/phantom-types/Hash";
import type { PID } from "typings/phantom-types/PID";
import type { Position } from "typings/Position";
import type { Process } from "typings/Process";
import type { RawBinary } from "typings/RawBinary";
import { ARS256 } from "utils/algorithms/ars256";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

type KernelState = {
  ////////////////////////////////////////////////////////////////
  // Not Collections
  ////////////////////////////////////////////////////////////////
  activeRef: OsRef<HTMLElement>;
  isRunningAreaFull: boolean;
  lastClickPosition: Position;
  openMenu: MenuState;
  isBsod: boolean;
  bsodReason: string;
  ////////////////////////////////////////////////////////////////
  // Collections
  ////////////////////////////////////////////////////////////////
  alternatives: readonly Alternative[];
  availablePids: readonly PID[];
  installedPrograms: readonly Binary[];
  runningProcesses: readonly Process[];
};

type SystemCalls = {
  ////////////////////////////////////////////////////////////////
  // Window
  ////////////////////////////////////////////////////////////////
  maximize: (process: Process) => void;
  minimize: (process: Process) => void;
  unMaximize: (process: Process) => void;
  unMinimize: (process: Process) => void;
  ////////////////////////////////////////////////////////////////
  // Menu
  ////////////////////////////////////////////////////////////////
  closeMenus: () => void;
  openContextMenu: (alternatives: readonly Alternative[]) => void;
  toggleStartMenu: () => void;
  ////////////////////////////////////////////////////////////////
  // Ui
  ////////////////////////////////////////////////////////////////
  activate: <T extends OsRef<HTMLElement>>(to: T) => void;
  setLastClickPosition: (to: Position) => void;
  setIsRunningAreaFull: (to: boolean) => void;
  ////////////////////////////////////////////////////////////////
  // Control
  ////////////////////////////////////////////////////////////////
  endProcess: (process: Process) => void;
  executeBinary: (binary: Binary) => void;
  installProgram: (rawBinary: RawBinary) => void;
  uninstallProgram: (binary: Binary) => void;
  ////////////////////////////////////////////////////////////////
  // Debug
  ////////////////////////////////////////////////////////////////
  bluescreen: (reason: string) => void;
};

type OperatingSystem = KernelState & SystemCalls;

let debugLogCounter = 0;

export const useKernel = create<OperatingSystem>(
  devtools(
    combine<KernelState, SystemCalls>(
      {
        ///////////////////////////////////////////
        // Not Collections
        ///////////////////////////////////////////
        activeRef: { current: null },
        isRunningAreaFull: false,
        lastClickPosition: { x: 0, y: 0 },
        openMenu: "",
        isBsod: false,
        bsodReason: "",
        ///////////////////////////////////////////
        // Collections
        ///////////////////////////////////////////
        alternatives: [],
        availablePids: Pids.available,
        installedPrograms: [],
        runningProcesses: [],
        ///////////////////////////////////////////
      } as const,

      (set) =>
        ({
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //* UI *
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
          setIsRunningAreaFull: (to: boolean) => {
            set(() => {
              return { isRunningAreaFull: to } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //* CONTROL *
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          endProcess: ({ pid: targetPid }: Process) => {
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
          executeBinary: (binary: Binary) => {
            set((store) => {
              const { isRunningAreaFull, runningProcesses } = store;

              if (isRunningAreaFull) {
                console.error(
                  "Out of task bar space! Ultra hi-fi (640x480) PATA modem required to launch more processes!",
                );

                return store;
              }

              const pid = Pids.use();

              if (isNull(pid)) {
                console.error("OUT OF PIDS! Kill some processes first.");
                return store;
              }

              const spawnedProcess: Process = {
                ////////////////////////////////////////////////////////
                binaryImage: binary,
                ////////////////////////////////////////////////////////
                ...binary,
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

              console.dir(spawnedProcess);

              return { runningProcesses: [...runningProcesses, spawnedProcess] } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          installProgram: (rawBinary: RawBinary) => {
            set(({ installedPrograms }) => {
              const binary: Binary = {
                ////////////////////////////////////////////////////////
                ...rawBinary,
                ////////////////////////////////////////////////////////
                fileName: `${rawBinary.name.toLowerCase()}.exe`,
                // Placeholder until we can hash the entire binary itself a few lines down.
                fileHash: "" as Hash,
                ////////////////////////////////////////////////////////
                desktopItemRef: { current: null },
                startMenuItemRef: { current: null },
                quickstartAreaItemRef: { current: null },
                ////////////////////////////////////////////////////////
              };

              // NOTE: Crucial step in which we hash the binary.
              binary.fileHash = ARS256(binary);

              return { installedPrograms: [...installedPrograms, binary] } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          uninstallProgram: ({ name }: Binary) => {
            set(({ installedPrograms }) => {
              const targetFileName = `${name.toLowerCase()}.exe`;

              const sparedPrograms = installedPrograms.filter(({ fileName }) => {
                // We spare every program whose `fileName` is NOT the `targetFileName`.
                return fileName !== targetFileName;
              });

              return { installedPrograms: sparedPrograms } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //* MENU *
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          closeMenus: () => {
            set(() => {
              return { openMenu: "" } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          openContextMenu: (alternatives: readonly Alternative[]) => {
            set(() => {
              if (!alternatives.length) {
                console.error("The array of alternatives was empty!");
              }

              return { openMenu: "ContextMenu", alternatives: [...alternatives] } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          toggleStartMenu: () => {
            set(({ openMenu }) => {
              const newMenu = openMenu === "StartMenu" ? "" : "StartMenu";

              return { openMenu: newMenu } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //* WINDOW *
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
          //* Debug *
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          bluescreen: (reason: string) => {
            set(() => {
              return { isBsod: true, bsodReason: reason } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } as const),
    ),
    "Kernel", // This names the store in the Redux DevTools.
  ),
);
