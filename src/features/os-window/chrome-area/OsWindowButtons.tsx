import { default as React } from 'react';
import { OsButton } from 'src/components/OsButton';
import { onLMB } from 'src/event-filters/onLMB';
import { useOsWindowControls } from 'src/hooks/os-window/useOsWindowControls';
import { useActiveState } from 'src/state/useActiveState';
import { useKernelState } from 'src/state/useKernelState';
import { useMenuState } from 'src/state/useMenuState';
import type { Process } from 'src/typings/Process';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { KernelState } from 'src/typings/state/KernelState';
import type { MenuState } from 'src/typings/state/MenuState';
import { bringToFront } from 'src/utils/bringToFront';
import styles from './OsWindowButtons.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ setActiveRef, unsetActiveRef }: ActiveState) => {
  return {
    setActiveRef,
    unsetActiveRef,
  };
};

const fromKernel = ({ endProcess }: KernelState) => {
  return {
    endProcess,
  };
};

const fromMenu = ({ closeMenus }: MenuState) => {
  return {
    closeMenus,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  process: Process;
};

export const OsWindowButtons = ({ process }: Props) => {
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
