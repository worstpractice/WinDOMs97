import { Pids } from "kernel/Pids";
import type { Binary } from "typings/Binary";
import type { Hash } from "typings/phantom-types/Hash";
import type { PID } from "typings/phantom-types/PID";
import type { Process } from "typings/Process";
import type { RawBinary } from "typings/RawBinary";
import type { KernelState } from "typings/state/KernelState";
import { ars256 } from "utils/algorithms/ars256";
import { softlinkInAllPlaces } from "utils/softlinkInAllPlaces";
import create from "zustand";
import { combine } from "zustand/middleware";

export type Data = {
  availablePids: readonly PID[];
  installedPrograms: readonly Binary[];
  runningProcesses: readonly Process[];
};

export type Actions = {
  endProcess: (process: Process) => void;
  dangerouslyExecuteBinary: (binary: Binary, pid: PID) => void;
  installProgram: (rawBinary: RawBinary) => void;
  uninstallProgram: (binary: Binary) => void;
};

export const useKernelState = create<KernelState>(
  combine<Data, Actions>(
    {
      ///////////////////////////////////////////
      availablePids: Pids.available,
      installedPrograms: [],
      runningProcesses: [],
      ///////////////////////////////////////////
    } as const,

    (set) =>
      ({
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
        dangerouslyExecuteBinary: (binary: Binary, pid: PID) => {
          set(({ runningProcesses }) => {
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
              softlinks: softlinks ?? softlinkInAllPlaces(),
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
            binary.fileHash = ars256(binary);

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
      } as const),
  ),
);