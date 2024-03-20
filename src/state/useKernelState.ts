import { MIN_HEIGHT, MIN_WIDTH } from 'src/constants/OsWindow';
import { RECOGNIZED_FILE_EXTENSIONS } from 'src/constants/recognizedFileExtensions';
import { Pids } from 'src/kernel/Pids';
import type { Binary } from 'src/typings/Binary';
import type { Pid } from 'src/typings/phantom-types/Pid';
import type { Process } from 'src/typings/Process';
import type { RawBinary } from 'src/typings/RawBinary';
import type { KernelState } from 'src/typings/state/KernelState';
import type { Unhashed } from 'src/typings/Unhashed';
import { ars256 } from 'src/utils/crypto/ars256';
import { deriveFileExtension } from 'src/utils/deriveFileExtension';
import { enforceMinDimensions } from 'src/utils/enforceMinDimensions';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export type Data = {
  readonly availablePids: readonly Pid[];
  readonly installedPrograms: readonly Binary[];
  readonly runningProcesses: readonly Process[];
};

export type Actions = {
  readonly dangerouslyExecuteBinary: (this: void, binary: Binary, pid: Pid) => void;
  readonly endProcess: (this: void, process: Process) => void;
  readonly installProgram: (this: void, rawBinary: RawBinary) => void;
  readonly uninstallProgram: (this: void, binary: Binary) => void;
};

export const useKernelState = create<KernelState>(
  combine<Data, Actions>(
    {
      ////////////////////////////////////////////////////////////////
      availablePids: Pids.available,
      installedPrograms: [],
      runningProcesses: [],
      ////////////////////////////////////////////////////////////////
    } as const,

    (set) => {
      return {
        ////////////////////////////////////////////////////////////////
        dangerouslyExecuteBinary: (binary: Binary, pid: Pid): void => {
          set(({ runningProcesses }: Data) => {
            const spawnedProcess: Process = {
              binaryImage: binary,
              chromeAreaRef: {
                current: null,
              },
              isMaximized: false,
              isMinimized: false,
              notificationAreaItemRef: {
                current: null,
              },
              osWindowRef: {
                current: null,
              },
              pid,
              programRef: {
                current: null,
              },
              runningAreaItemRef: {
                current: null,
              },
            } as const;

            return {
              runningProcesses: [...runningProcesses, spawnedProcess],
            } as const;
          });
        },
        ////////////////////////////////////////////////////////////////
        endProcess: ({ pid: targetPid }: Process): void => {
          set(({ runningProcesses }: Data) => {
            // We spare every process whose `pid` is NOT the `targetPid`.
            const sparedProcesses: readonly Process[] = runningProcesses //
              .filter(({ pid }: Process): boolean => {
                return pid !== targetPid;
              });

            // Just like in C, thou shalt remember to free.
            Pids.free(targetPid);

            return {
              runningProcesses: sparedProcesses,
            } as const;
          });
        },
        ////////////////////////////////////////////////////////////////
        installProgram: (rawBinary: RawBinary): void => {
          set(({ installedPrograms }: Data) => {
            // Extract optional properties so we can populate these fields manually a few lines down.
            const { isSingleInstanceOnly, startingDimensions } = rawBinary;

            enforceMinDimensions(rawBinary);

            const fileExtension = deriveFileExtension(rawBinary);

            const unhashed: Unhashed<Binary> = {
              ...rawBinary,
              desktopItemRef: {
                current: null,
              },
              isBeingRenamed: false,
              isFileExtensionRecognized: RECOGNIZED_FILE_EXTENSIONS.includes(fileExtension),
              isSingleInstanceOnly: isSingleInstanceOnly ?? false,
              quickstartAreaItemRef: {
                current: null,
              },
              startingDimensions: startingDimensions ?? {
                x: MIN_HEIGHT,
                y: MIN_WIDTH,
              },
              startMenuItemRef: {
                current: null,
              },
            } as const;

            // NOTE: Crucial step in which we hash the binary.
            const hashed: Binary = {
              ...unhashed,
              fileHash: ars256(unhashed),
            } as const;

            return {
              installedPrograms: [...installedPrograms, hashed],
            } as const;
          });
        },
        ////////////////////////////////////////////////////////////////
        uninstallProgram: ({ fileHash: targetHash }: Binary): void => {
          set(({ installedPrograms }: Data) => {
            // We spare every program whose `fileName` is NOT the `targetFileName`.
            const sparedPrograms: readonly Binary[] = installedPrograms.filter(({ fileHash }: Binary): boolean => {
              return fileHash !== targetHash;
            });

            return {
              installedPrograms: sparedPrograms,
            } as const;
          });
        },
        ////////////////////////////////////////////////////////////////
      } as const;
    },
  ),
);
