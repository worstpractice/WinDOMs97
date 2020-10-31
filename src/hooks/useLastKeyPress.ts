import { useEffect } from "react";
import { useKeyboardState } from "state/useKeyboardState";
import type { CleanupFn } from "typings/CleanupFn";
import type { KeyboardHandler } from "typings/handlers/KeyboardHandler";
import type { KeyboardState } from "typings/state/KeyboardState";
import { listen } from "utils/listen";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKeyboard = ({ setLastKeyPress }: KeyboardState) => ({
  setLastKeyPress,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useLastKeyPress = () => {
  const { setLastKeyPress } = useKeyboardState(fromKeyboard);

  useEffect(() => {
    let isCancelled = false;

    const effect = (): CleanupFn | undefined => {
      if (isCancelled) return;

      const handleKeyDown: KeyboardHandler<Document> = ({ key }) => {
        setLastKeyPress(key);
      };

      // NOTE: It's subtle, but we're passing a cleanup function to `useEffect`.
      return listen({
        event: "keydown",
        handler: handleKeyDown,
        on: document,
      });
    };

    const cleanupFn: CleanupFn | undefined = effect();

    return function cleanup() {
      isCancelled = true;
      cleanupFn?.();
    };
  }, [setLastKeyPress]);
};
