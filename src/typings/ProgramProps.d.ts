import type { Process } from "typings/Process";

export type ProgramProps = {
  process: Process;
  setOsWindowDimensions: (dimensions: { width: number; height: number }) => void;
};
