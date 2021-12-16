import type { Binary } from 'src/typings/Binary';
import type { OsRef } from 'src/typings/OsRef';
import type { Pid } from 'src/typings/phantom-types/Pid';

export type Process = {
  ////////////////////////////////////////////////////////
  binaryImage: Binary;
  ////////////////////////////////////////////////////////
  pid: Pid;
  ////////////////////////////////////////////////////////
  isMaximized: boolean;
  isMinimized: boolean;
  ////////////////////////////////////////////////////////
  chromeAreaRef: OsRef<HTMLElement>;
  notificationAreaItemRef: OsRef<HTMLLIElement>;
  runningAreaItemRef: OsRef<HTMLButtonElement>;
  osWindowRef: OsRef<HTMLElement>;
  ////////////////////////////////////////////////////////
  programRef: OsRef<HTMLElement>;
  ////////////////////////////////////////////////////////
};
