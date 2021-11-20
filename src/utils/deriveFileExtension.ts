import type { RawBinary } from 'src/typings/RawBinary';

export const deriveFileExtension = <T extends RawBinary>({ fileName }: T) => {
  if (!fileName.includes('.')) {
    throw new ReferenceError('What am I to you Erik');
  }

  const fileNameParts = fileName.split('.');

  const lastItemIndex = fileNameParts.length - 1;

  const fileExtension = fileNameParts[lastItemIndex];

  return fileExtension;
};
