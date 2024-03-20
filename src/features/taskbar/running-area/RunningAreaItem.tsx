import { default as React, useRef } from 'react';
import { Icon } from 'src/components/Icon';
import { OsButton } from 'src/components/OsButton';
import { useProcessAlternatives } from 'src/hooks/alternatives/useProcessAlternatives';
import { useOsWindowControls } from 'src/hooks/os-window/useOsWindowControls';
import { useActiveState } from 'src/state/useActiveState';
import { useMenuState } from 'src/state/useMenuState';
import type { ButtonLoader } from 'src/typings/Loader';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { bringToFront } from 'src/utils/bringToFront';
import { onLmb } from 'src/utils/event-filters/onLmb';
import { onRmb } from 'src/utils/event-filters/onRmb';
import { from } from 'src/utils/state/from';
import { isRef } from 'src/utils/type-predicates/isRef';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('activeRef', 'setActiveRef', 'unsetActiveRef');
const fromMenu = from<MenuState>().select('closeMenus', 'openContextMenu');
////////////////////////////////////////////////////////////////

type Props = {
  readonly getProcess: ButtonLoader;
};

export const RunningAreaItem = ({ getProcess }: Props) => {
  const { activeRef, setActiveRef, unsetActiveRef } = useActiveState(fromActive);
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const runningAreaItemRef = useRef<HTMLButtonElement>(null);
  const process = getProcess(runningAreaItemRef);
  const alternatives = useProcessAlternatives(process);
  const { minimize, unMinimize } = useOsWindowControls(process);

  const handleContextMenu = onRmb<HTMLButtonElement>(() => {
    openContextMenu(alternatives);
  });

  const handleMouseDown = onLmb<HTMLButtonElement>((event) => {
    // NOTE: This event should not reach the `Taskbar` below, or it will become active instead of the `OsWindow` we meant to setActiveRef.
    event.stopPropagation();
    closeMenus();

    const { osWindowRef } = process;

    if (isRef(activeRef, osWindowRef)) {
      minimize();
      unsetActiveRef();
    } else {
      unMinimize();
      setActiveRef(osWindowRef);
      bringToFront(osWindowRef);
    }
  });

  const { binaryImage } = process;
  const { icon, programName } = binaryImage;

  return (
    <OsButton style={styles.RunningAreaItem} onContextMenu={handleContextMenu} onMouseDown={handleMouseDown} ref={runningAreaItemRef}>
      <Icon alt={programName} height={20} src={icon} width={20} />
      <p style={styles.Title}>{programName}</p>
    </OsButton>
  );
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
const styles = {
  RunningAreaItem: css({
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    gap: '6px',
    height: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '240px',
  } as const),

  Title: css({
    fontSize: '18px',
  } as const),
} as const;
