import type { Binary } from "typings/Binary";

export const getFileExtension = ({ fileName }: Binary) => {
  if (!fileName.includes(".")) {
    throw new ReferenceError("What am I to you Erik");
  }

  const fileNameParts = fileName.split(".");

  const lastItemIndex = fileNameParts.length - 1;

  const fileExtension = fileNameParts[lastItemIndex];

  return fileExtension;
};
