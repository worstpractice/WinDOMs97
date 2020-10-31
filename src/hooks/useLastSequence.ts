import { useLayoutEffect, useRef } from "react";
import { useKeyboardState } from "state/useKeyboardState";
import type { Binary } from "typings/Binary";
import type { KeyboardState } from "typings/state/KeyboardState";
import { getFileExtension } from "utils/getFileExtension";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKeyboard = ({ lastKeyPress }: KeyboardState) => ({
  lastKeyPress,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useLastSequence = (binary: Binary) => {
  const { lastKeyPress } = useKeyboardState(fromKeyboard);
  const sequenceRef = useRef("");

  useLayoutEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      const { isBeingRenamed } = binary;

      if (!isBeingRenamed) return;

      const { button, character } = lastKeyPress;

      if (button === "Enter") {
        binary.isBeingRenamed = false;

        const fileExtension = getFileExtension(binary);

        if (sequenceRef.current.endsWith(fileExtension)) {
          binary.fileName = sequenceRef.current;
        } else {
          const isChangingFileExtension = window.confirm("Do you really want to change the file extension?");

          if (isChangingFileExtension) {
            binary.fileName = sequenceRef.current;
          }
        }

        binary.isBeingRenamed = false;
        sequenceRef.current = "";
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
