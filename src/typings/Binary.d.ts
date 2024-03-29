import type { OsRef } from 'src/typings/OsRef';
import type { Hash } from 'src/typings/phantom-types/Hash';
import type { RawBinary } from 'src/typings/RawBinary';

export type Binary = {
  [key in keyof RawBinary]-?: RawBinary[key];
} & {
  readonly fileHash: Hash;
  isBeingRenamed: boolean;
  isFileExtensionRecognized: boolean;
  ////////////////////////////////////////////////////////////////
  // Refs
  ////////////////////////////////////////////////////////////////
  desktopItemRef: OsRef<HTMLElement>;
  startMenuItemRef: OsRef<HTMLElement>;
  quickstartAreaItemRef: OsRef<HTMLElement>;
};
