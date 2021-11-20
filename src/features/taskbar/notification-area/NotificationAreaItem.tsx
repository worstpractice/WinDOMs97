import { default as React } from 'react';
import { Icon } from 'src/components/Icon';
import { OsButton } from 'src/components/OsButton';
import { onLMB } from 'src/event-filters/onLMB';
import { onRMB } from 'src/event-filters/onRMB';
import { useProcessAlternatives } from 'src/hooks/alternatives/useProcessAlternatives';
import { useOsRef } from 'src/hooks/useOsRef';
import { useActiveState } from 'src/state/useActiveState';
import { useMenuState } from 'src/state/useMenuState';
import type { LiLoader } from 'src/typings/Loader';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { MenuState } from 'src/typings/state/MenuState';
import { bringToFront } from 'src/utils/bringToFront';
import styles from './NotificationAreaItem.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ setActiveRef }: ActiveState) => {
  return {
    setActiveRef,
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
  getProcess: LiLoader;
};

export const NotificationAreaItem = ({ getProcess }: Props) => {
  const { setActiveRef } = useActiveState(fromActive);
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const notificationAreaItemRef = useOsRef<HTMLLIElement>();
  const process = getProcess(notificationAreaItemRef);
  const alternatives = useProcessAlternatives(process);

  const handleContextMenu = onRMB<HTMLButtonElement>(() => {
    openContextMenu(alternatives);
  });

  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
    // NOTE: This is required since the event would bubble up and hand control back over to the taskbar (which we don't want).
    e.stopPropagation();
    closeMenus();
    setActiveRef(process.osWindowRef);
    bringToFront(process.osWindowRef);
  });

  const { icon, programName } = process.binaryImage;

  return (
    <li className={styles.NotificationAreaItem} ref={notificationAreaItemRef}>
      <OsButton className={styles.ButtonOverride} onContextMenu={handleContextMenu} onMouseDown={handleMouseDown}>
        <Icon alt={programName} height={24} src={icon} width={24} />
      </OsButton>
    </li>
  );
};
