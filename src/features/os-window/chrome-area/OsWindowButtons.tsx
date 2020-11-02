import { OsButton } from "components/OsButton";
import { onLMB } from "event-filters/onLMB";
import { useOsWindowControls } from "hooks/os-window/useOsWindowControls";
import { default as React } from "react";
import { useActiveState } from "state/useActiveState";
import { useKernelState } from "state/useKernelState";
import { useMenuState } from "state/useMenuState";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import type { ActiveState } from "typings/state/ActiveState";
import type { KernelState } from "typings/state/KernelState";
import type { MenuState } from "typings/state/MenuState";
import { bringToFront } from "utils/bringToFront";
import styles from "./OsWindowButtons.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ setActiveRef, unsetActiveRef }: ActiveState) => ({
  setActiveRef,
  unsetActiveRef,
});

const fromKernel = ({ endProcess }: KernelState) => ({
  endProcess,
});

const fromMenu = ({ closeMenus }: MenuState) => ({
  closeMenus,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  process: Process;
};

export const OsWindowButtons: FC<Props> = ({ process }) => {
  const { setActiveRef, unsetActiveRef } = useActiveState(fromActive);
  const { closeMenus } = useMenuState(fromMenu);
  const { endProcess } = useKernelState(fromKernel);
  const { maximize, minimize, unMaximize } = useOsWindowControls(process);

  /////////////////////////////////////////////////////////////////////////////////////////
  // Domain-Specific Handlers
  /////////////////////////////////////////////////////////////////////////////////////////
  const handleExit = onLMB<HTMLButtonElement>(() => {
    endProcess(process);
  });

  const handleMaximize = onLMB<HTMLButtonElement>(() => {
    const { isMaximized, osWindowRef } = process;
    setActiveRef(osWindowRef);
    bringToFront(osWindowRef);
    isMaximized ? unMaximize() : maximize();
  });

  const handleMinimize = onLMB<HTMLButtonElement>(() => {
    minimize();
    unsetActiveRef();
  });

  /////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  /////////////////////////////////////////////////////////////////////////////////////////
  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
    // NOTE: This is necessary to stop the `OsWindow` from starting to move.
    e.stopPropagation();
    closeMenus();
  });

  //////////////////////////////////////////////////////////////////////////////

  return (
    <section className={styles.ButtonRow}>
      <OsButton onMouseDown={handleMouseDown} onMouseUp={handleMinimize}>
        _
      </OsButton>
      <OsButton onMouseDown={handleMouseDown} onMouseUp={handleMaximize}>
        #
      </OsButton>
      <OsButton onMouseDown={handleMouseDown} onMouseUp={handleExit}>
        X
      </OsButton>
    </section>
  );
};
