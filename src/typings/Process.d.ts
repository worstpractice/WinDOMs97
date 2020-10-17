import type { OsRef } from "typings/OsRef";
import type { Pid } from "typings/phantom-types/Pid";

export type Process = {
  ////////////////////////////////////////////////////////
  icon: string;
  name: string;
  pid: Pid;
  ////////////////////////////////////////////////////////
  isMaximized: boolean;
  isMinimized: boolean;
  ////////////////////////////////////////////////////////
  chromeAreaRef: OsRef<HTMLElement>;
  notificationItemRef: OsRef<HTMLLIElement>;
  runningItemRef: OsRef<HTMLButtonElement>;
  osWindowRef: OsRef<HTMLElement>;
  ////////////////////////////////////////////////////////
};
