import type { RawBinary } from 'src/typings/RawBinary';

export const deriveFileExtension = <T extends RawBinary>(binary: T): string => {
  const { fileName } = binary;

  if (!fileName.includes('.')) {
    console.error('Missing file extension!');
    throw binary;
  }

  const [fileExtension = ''] = fileName.split('.').reverse();

  return fileExtension;
};
