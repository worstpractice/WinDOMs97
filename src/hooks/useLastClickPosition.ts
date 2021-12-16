import { useEffect } from 'react';
import { useClickState } from 'src/state/useClickState';
import { useMenuState } from 'src/state/useMenuState';
import type { CleanupFn } from 'src/typings/CleanupFn';
import type { MouseHandler } from 'src/typings/handlers/MouseHandler';
import type { ClickState } from 'src/typings/state/ClickState';
import type { MenuState } from 'src/typings/state/MenuState';
import { listen } from 'src/utils/listen';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromClick = from<ClickState>().select('setLastClickPosition');
const fromMenu = from<MenuState>().select('closeMenus');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useLastClickPosition = () => {
  const { setLastClickPosition } = useClickState(fromClick);
  const { closeMenus } = useMenuState(fromMenu);

  useEffect(() => {
    let isCancelled = false;

    const effect = (): CleanupFn | undefined => {
      if (isCancelled) return;

      const handleMouseDown: MouseHandler<Document> = ({ clientX, clientY }) => {
        setLastClickPosition({ x: clientX, y: clientY });
        closeMenus();
      };

      // NOTE: It's subtle, but we're passing a cleanup function to `useEffect`.
      return listen({
        event: 'mousedown',
        handler: handleMouseDown,
        on: document,
      });
    };

    const cleanupFn: CleanupFn | undefined = effect();

    return function cleanup() {
      isCancelled = true;
      cleanupFn?.();
    };
  }, [closeMenus, setLastClickPosition]);
};
