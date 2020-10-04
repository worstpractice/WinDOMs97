// import { cdRomDrive, folderClosed } from "assets/icons";
import cdRomDrive from "assets/icons/cd_drive-0.png";
import type { Program } from "typings";

export const programs: readonly Program[] = [
  { icon: cdRomDrive, name: "Balls of Steel.exe" },
  // { icon: folderClosed, name: "Important research" },
] as const;
