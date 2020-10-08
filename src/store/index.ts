import { programs } from "programs";
import type { Binary } from "typings/Binary";
import type { MousePosition } from "typings/MousePosition";
import type { Process } from "typings/Process";
import type { Widget } from "typings/Widget";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

type Data = {
  activeWidget: Widget;
  installed: readonly Binary[];
  lastClick: MousePosition;
  running: readonly Process[];
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
        installed: programs,
        lastClick: { x: 0, y: 0 },
        running: [],
      } as const,

      (set) =>
        ({
          endProcess(process: Process) {
            set(({ running }) => ({ running: running.filter((p) => Object.is(p, process)) } as const));
          },
          executeBinary(binary: Binary) {
            set(({ running }) => ({ running: [...running, { ...binary, pid: running.length }] } as const));
          },
          setActiveWidget(to: Widget) {
            set(() => ({ activeWidget: to } as const));
          },
          setLastClick(to: MousePosition) {
            set(() => ({ lastClick: to } as const));
          },
        } as const),
    ),
  ),
);
