import type { MutableRefObject } from "react";

type Data = {
  icon: string;
  name: string;
  pid: number;
  windowRef: MutableRefObject<HTMLDivElement | null>;
};

type Actions = {};

export type Process = Data & Actions;
