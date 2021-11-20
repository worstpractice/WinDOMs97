import { Pids } from 'src/kernel/Pids';
import { MIN_HEIGHT, MIN_WIDTH } from 'src/os-constants/OsWindow';
import { recognizedFileExtensions } from 'src/os-constants/recognizedFileExtensions';
import type { Binary } from 'src/typings/Binary';
import type { Hash } from 'src/typings/phantom-types/Hash';
import type { PID } from 'src/typings/phantom-types/Pid';
import type { Process } from 'src/typings/Process';
import type { RawBinary } from 'src/typings/RawBinary';
import type { KernelState } from 'src/typings/state/KernelState';
import { ars256 } from 'src/utils/crypto/ars256';
import { deriveFileExtension } from 'src/utils/deriveFileExtension';
import { enforceMinDimensions } from 'src/utils/enforceMinDimensions';
import { softlinkInAllPlaces } from 'src/utils/softlinkInAllPlaces';
import create from 'zustand';
import { combine } from 'zustand/middleware';

export type Data = {
  readonly availablePids: readonly PID[];
  readonly installedPrograms: readonly Binary[];
  readonly runningProcesses: readonly Process[];
};

export type Actions = {
  readonly dangerouslyExecuteBinary: (binary: Binary, pid: PID) => void;
  readonly endProcess: (process: Process) => void;
  readonly installProgram: (rawBinary: RawBinary) => void;
  readonly uninstallProgram: (binary: Binary) => void;
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

    (set) => {
      return {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        dangerouslyExecuteBinary: (binary: Binary, pid: PID): void => {
          set(({ runningProcesses }) => {
            const spawnedProcess: Process = {
              binaryImage: binary,
              chromeAreaRef: { current: null },
              isMaximized: false,
              isMinimized: false,
              notificationAreaItemRef: { current: null },
              osWindowRef: { current: null },
              pid,
              programRef: { current: null },
              runningAreaItemRef: { current: null },
            } as const;

            return { runningProcesses: [...runningProcesses, spawnedProcess] } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        endProcess: ({ pid: targetPid }: Process): void => {
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
        installProgram: (rawBinary: RawBinary): void => {
          set(({ installedPrograms }) => {
            // Extract optional properties so we can populate these fields manually a few lines down.
            const { isSingleInstanceOnly, softlinks, startingDimensions } = rawBinary;

            enforceMinDimensions(rawBinary);

            const fileExtension = deriveFileExtension(rawBinary) ?? '';

            const binary: Binary = {
              ...rawBinary,
              desktopItemRef: { current: null },
              // Placeholder until we can hash the entire binary itself a few lines down.
              fileHash: '' as Hash,
              isBeingRenamed: false,
              isFileExtensionRecognized: recognizedFileExtensions.includes(fileExtension),
              isSingleInstanceOnly: isSingleInstanceOnly ?? false,
              quickstartAreaItemRef: { current: null },
              softlinks: softlinks ?? softlinkInAllPlaces(),
              startingDimensions: startingDimensions ?? { x: MIN_HEIGHT, y: MIN_WIDTH },
              startMenuItemRef: { current: null },
            };

            // NOTE: Crucial step in which we hash the binary.
            binary.fileHash = ars256(binary);

            return { installedPrograms: [...installedPrograms, binary] } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        uninstallProgram: ({ fileHash: targetHash }: Binary): void => {
          set(({ installedPrograms }) => {
            const sparedPrograms = installedPrograms.filter(({ fileHash }) => {
              // We spare every program whose `fileName` is NOT the `targetFileName`.
              return fileHash !== targetHash;
            });

            return { installedPrograms: sparedPrograms } as const;
          });
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
