import type { OsRef } from "typings/OsRef";

export type Process = {
  ////////////////////////////////////////////////////////
  icon: string;
  name: string;
  pid: number;
  ////////////////////////////////////////////////////////
  isMaximized: boolean;
  isMinimized: boolean;
  ////////////////////////////////////////////////////////
  chromeAreaRef: OsRef<HTMLElement>;
  notificationItemRef: OsRef<HTMLLIElement>;
  runningItemRef: OsRef<HTMLButtonElement>;
  windowRef: OsRef<HTMLElement>;
  ////////////////////////////////////////////////////////
};
