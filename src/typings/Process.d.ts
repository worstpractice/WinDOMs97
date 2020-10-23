import type { Binary } from "typings/Binary";
import type { OsRef } from "typings/OsRef";
import type { PID } from "typings/phantom-types/PID";

export type Process = {
  ////////////////////////////////////////////////////////
  binaryImage: Binary;
  ////////////////////////////////////////////////////////
  icon: string;
  name: string;
  pid: PID;
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
