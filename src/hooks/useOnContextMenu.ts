import { onRMB } from "event-filters/onRMB";
import { useKernel } from "kernel";
import { useCallback, useEffect } from "react";
import { compose } from "utils/compose";
import { listen } from "utils/listen";

export const useOnContextMenu = () => {
  const { openContextMenu } = useKernel();

  const handleContextMenu = useCallback(
    onRMB(({ target }) => {
      console.log("Here you can do stuff with", target);
      openContextMenu();
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
