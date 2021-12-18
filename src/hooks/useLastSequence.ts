import { useLayoutEffect, useRef } from 'react';
import { RECOGNIZED_FILE_EXTENSIONS } from 'src/constants/recognizedFileExtensions';
import { useKeyboardState } from 'src/state/useKeyboardState';
import type { Binary } from 'src/typings/Binary';
import type { KeyboardState } from 'src/typings/state/KeyboardState';
import { deriveFileExtension } from 'src/utils/deriveFileExtension';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKeyboard = from<KeyboardState>().select('lastKeyPress');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useLastSequence = (binary: Binary) => {
  const { lastKeyPress } = useKeyboardState(fromKeyboard);
  const sequenceRef = useRef('');

  useLayoutEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      const { isBeingRenamed } = binary;

      if (!isBeingRenamed) return;

      const { button, character } = lastKeyPress;

      if (button === 'Enter') {
        binary.isBeingRenamed = false;

        if (!sequenceRef.current.trim().length) {
          sequenceRef.current = '';
          return;
        }

        const fileExtension = deriveFileExtension(binary) ?? '';

        const isSameFileExtension = sequenceRef.current.endsWith(fileExtension);

        if (isSameFileExtension) {
          binary.fileName = sequenceRef.current;
        } else {
          const isChangingFileExtension = window.confirm('Do you really want to change the file extension?');

          if (isChangingFileExtension) {
            binary.isFileExtensionRecognized = RECOGNIZED_FILE_EXTENSIONS.includes(fileExtension);
            binary.fileName = sequenceRef.current;
          }
        }

        binary.isBeingRenamed = false;
        sequenceRef.current = '';
      } else {
        sequenceRef.current += character;
      }
    };

    effect();

    return function cleanup() {
      isCancelled = true;
    };
  }, [binary, lastKeyPress]);

  return sequenceRef.current;
};
