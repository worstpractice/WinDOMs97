import { programs } from "programs";
import type { Binary } from "typings/Binary";
import type { MousePosition } from "typings/MousePosition";
import type { Process } from "typings/Process";
import type { Widget } from "typings/Widget";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

type Data = {
  activeWidget: Widget;
  installedBinaries: readonly Binary[];
  lastClickPosition: MousePosition;
  runningProcesses: readonly Process[];

};

type Actions = {
  endProcess: (process: Process) => void;
  executeBinary: (binary: Binary) => void;
  setActiveWidget: (to: Widget) => void;
  setLastClick: (to: MousePosition) => void;

};

type State = Data & Actions;

export const useStore = create<State>(
  devtools(
    combine<Data, Actions>(
      {
        activeWidget: "Desktop",
        installedBinaries: programs,
        lastClickPosition: { x: 0, y: 0 },
        runningProcesses: [],
      } as const,

      (set) =>
        ({
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          endProcess(process: Process) {
            set(({ runningProcesses }) => {
              const oneProcessFewer = runningProcesses.filter((p) => {
                return Object.is(p, process);
              });

              return { runningProcesses: oneProcessFewer } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          executeBinary(binary: Binary) {
            set(({ runningProcesses }) => {
              const pid = runningProcesses.length;

              const oneAdditionalProcess = [...runningProcesses, { ...binary, pid }] as const;

              return { runningProcesses: oneAdditionalProcess } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          setActiveWidget(to: Widget) {
            set(() => {
              return { activeWidget: to } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          setLastClick(to: MousePosition) {
            set(() => {
              return { lastClickPosition: to } as const;
            });
          },
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } as const),
    ),
  ),
);
