import { OUT_OF_PIDS, OUT_OF_TASKBAR } from "kernel/errors";
import { Pids } from "kernel/Pids";
import { isNull } from "type-predicates/isNull";
import type { Binary } from "typings/Binary";
import type { Hash } from "typings/phantom-types/Hash";
import type { PID } from "typings/phantom-types/PID";
import type { Position } from "typings/Position";
import type { Process } from "typings/Process";
import type { RawBinary } from "typings/RawBinary";
import { ARS256 } from "utils/algorithms/ars256";
import { everywhere } from "utils/everwhere";
import create from "zustand";
import { combine } from "zustand/middleware";

type Data = {
  ////////////////////////////////////////////////////////////////
  // Not Collections
  ////////////////////////////////////////////////////////////////
  isRunningAreaFull: boolean;
  lastClickPosition: Position;
  isBsod: boolean;
  bsodError: string;
  bsodMessage: string;
  ////////////////////////////////////////////////////////////////
  // Collections
  ////////////////////////////////////////////////////////////////
  availablePids: readonly PID[];
  installedPrograms: readonly Binary[];
  runningProcesses: readonly Process[];
};

/** NOTE: Temporarily located here for simplicity. `useErrorState` should be its own hook. */
export type BSOD = Pick<Data, "isBsod" | "bsodError" | "bsodMessage">;

type Actions = {
  ////////////////////////////////////////////////////////////////
  // Ui
  ////////////////////////////////////////////////////////////////
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
  bluescreen: (error: string, message: string) => void;
};

export type KernelState = Data & Actions;

export const useKernelState = create<KernelState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      // Not Collections
      ///////////////////////////////////////////
      isRunningAreaFull: false,
      lastClickPosition: { x: 0, y: 0 },
      isBsod: false,
      bsodError: "",
      bsodMessage: "",
      ///////////////////////////////////////////
      // Collections
      ///////////////////////////////////////////
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
          set(({ isRunningAreaFull, runningProcesses }) => {
            if (isRunningAreaFull) {
              return OUT_OF_TASKBAR;
            }

            const pid = Pids.use();

            if (isNull(pid)) {
              return OUT_OF_PIDS;
            }

            const { isSingleInstanceOnly } = binary;

            if (isSingleInstanceOnly) {
              // BEGIN EXPENSIVE SEARCH //////////////////////////////
              const { fileHash: targetHash } = binary;

              for (const { binaryImage } of runningProcesses) {
                const { fileHash } = binaryImage;

                if (fileHash === targetHash) {
                  // Abort launch
                  return { runningProcesses } as const;
                }
              }
              // END EXPENSIVE SEARCH ////////////////////////////////
            }

            const spawnedProcess: Process = {
              ////////////////////////////////////////////////////////
              binaryImage: binary,
              ////////////////////////////////////////////////////////
              pid,
              ////////////////////////////////////////////////////////
              isMaximized: false,
              isMinimized: false,
              ////////////////////////////////////////////////////////
              chromeAreaRef: { current: null },
              notificationAreaItemRef: { current: null },
              runningAreaItemRef: { current: null },
              osWindowRef: { current: null },
              ////////////////////////////////////////////////////////
              programRef: { current: null },
              ////////////////////////////////////////////////////////
            } as const;

            return { runningProcesses: [...runningProcesses, spawnedProcess] } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        installProgram: (rawBinary: RawBinary) => {
          set(({ installedPrograms }) => {
            // Extract optional properties so we can populate these fields manually a few lines down.
            const { isSingleInstanceOnly, softlinks, startingDimensions } = rawBinary;

            const binary: Binary = {
              ////////////////////////////////////////////////////////
              ...rawBinary,
              isSingleInstanceOnly: isSingleInstanceOnly ?? false,
              softlinks: softlinks ?? everywhere(),
              startingDimensions: startingDimensions ?? { x: 400, y: 400 },
              ////////////////////////////////////////////////////////
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
        uninstallProgram: ({ fileHash: targetHash }: Binary) => {
          set(({ installedPrograms }) => {
            const sparedPrograms = installedPrograms.filter(({ fileHash }) => {
              // We spare every program whose `fileName` is NOT the `targetFileName`.
              return fileHash !== targetHash;
            });

            return { installedPrograms: sparedPrograms } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //* Debug *
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        bluescreen: (error: string, message: string) => {
          set(() => {
            return {
              isBsod: true,
              bsodError: error,
              bsodMessage: message,
            } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const),
  ),
);
