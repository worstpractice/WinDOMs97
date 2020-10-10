import type { MutableRefObject } from "react";

type Data = {
  ////////////////////////////////////////////////////////
  icon: string;
  name: string;
  pid: number;
  ////////////////////////////////////////////////////////
  isMinimized: boolean;
  ////////////////////////////////////////////////////////
  notificationItemRef: MutableRefObject<HTMLDivElement | null>;
  runningItemRef: MutableRefObject<HTMLDivElement | null>;
  windowRef: MutableRefObject<HTMLDivElement | null>;
  ////////////////////////////////////////////////////////
};

type Actions = {};

export type Process = Data & Actions;
