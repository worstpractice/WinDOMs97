import { Icon } from 'components/Icon';
import { OsButton } from 'components/OsButton';
import { Words } from 'components/Words';
import { onLMB } from 'event-filters/onLMB';
import { onRMB } from 'event-filters/onRMB';
import { useProcessAlternatives } from 'hooks/alternatives/useProcessAlternatives';
import { useOsWindowControls } from 'hooks/os-window/useOsWindowControls';
import { useOsRef } from 'hooks/useOsRef';
import { useActiveState } from 'state/useActiveState';
import { useMenuState } from 'state/useMenuState';
import { isRef } from 'type-predicates/isRef';
import type { ButtonLoader } from 'typings/Loader';
import type { ActiveState } from 'typings/state/ActiveState';
import type { MenuState } from 'typings/state/MenuState';
import { bringToFront } from 'utils/bringToFront';
import styles from './RunningAreaItem.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activeRef, setActiveRef, unsetActiveRef }: ActiveState) => {
  return {
    activeRef,
    setActiveRef,
    unsetActiveRef,
  };
};

const fromMenu = ({ closeMenus, openContextMenu }: MenuState) => {
  return {
    closeMenus,
    openContextMenu,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getProcess: ButtonLoader;
};

export const RunningAreaItem = ({ getProcess }: Props) => {
  const { activeRef, setActiveRef, unsetActiveRef } = useActiveState(fromActive);
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const runningAreaItemRef = useOsRef<HTMLButtonElement>();
  const process = getProcess(runningAreaItemRef);
  const alternatives = useProcessAlternatives(process);
  const { minimize, unMinimize } = useOsWindowControls(process);

  const handleContextMenu = onRMB<HTMLButtonElement>(() => {
    openContextMenu(alternatives);
  });

  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
    // NOTE: This event should not reach the `Taskbar` below, or it will become active instead of the `OsWindow` we meant to setActiveRef.
    e.stopPropagation();
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
    <OsButton className={styles.RunningAreaItem} onContextMenu={handleContextMenu} onMouseDown={handleMouseDown} ref={runningAreaItemRef}>
      <Icon alt={programName} height={20} src={icon} width={20} />
      <Words of={programName} style={{ fontSize: '18px' }} />
    </OsButton>
  );
};
