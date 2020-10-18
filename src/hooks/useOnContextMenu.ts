import { onRMB } from "event-filters/onRMB";
import { useCallback, useEffect } from "react";
import { compose } from "utils/compose";
import { listen } from "utils/listen";

export const useOnContextMenu = (handler: () => void) => {
  const handleContextMenu = useCallback(
    onRMB(({ target }) => {
      console.log(`ContextMenu:`, target);
      handler();
    }),
    [],
  );

  useEffect(() => {
    const cleanup = compose(
      listen({
        event: "contextmenu",
        handler: handleContextMenu,
        on: document,
        options: { capture: true },
      }),
    );

    return cleanup;
  }, [handleContextMenu]);
};
