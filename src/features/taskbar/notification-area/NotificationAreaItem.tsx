import { default as React, useRef } from 'react';
import { Icon } from 'src/components/Icon';
import { OsButton } from 'src/components/OsButton';
import { useProcessAlternatives } from 'src/hooks/alternatives/useProcessAlternatives';
import { useActiveState } from 'src/state/useActiveState';
import { useMenuState } from 'src/state/useMenuState';
import type { LiLoader } from 'src/typings/Loader';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { MenuState } from 'src/typings/state/MenuState';
import { css } from 'src/utils/as/css';
import { bringToFront } from 'src/utils/bringToFront';
import { onLmb } from 'src/utils/event-filters/onLmb';
import { onRmb } from 'src/utils/event-filters/onRmb';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('setActiveRef');
const fromMenu = from<MenuState>().select('closeMenus', 'openContextMenu');
////////////////////////////////////////////////////////////////

type Props = {
  readonly getProcess: LiLoader;
};

export const NotificationAreaItem = ({ getProcess }: Props) => {
  const { setActiveRef } = useActiveState(fromActive);
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const notificationAreaItemRef = useRef<HTMLLIElement>(null);
  const process = getProcess(notificationAreaItemRef);
  const alternatives = useProcessAlternatives(process);

  const handleContextMenu = onRmb<HTMLButtonElement>(() => {
    openContextMenu(alternatives);
  });

  const handleMouseDown = onLmb<HTMLButtonElement>((event) => {
    // NOTE: This is required since the event would bubble up and hand control back over to the taskbar (which we don't want).
    event.stopPropagation();
    closeMenus();
    setActiveRef(process.osWindowRef);
    bringToFront(process.osWindowRef);
  });

  const { icon, programName } = process.binaryImage;

  return (
    <li style={styles.NotificationAreaItem} ref={notificationAreaItemRef}>
      <OsButton style={styles.ButtonOverride} onContextMenu={handleContextMenu} onMouseDown={handleMouseDown}>
        <Icon alt={programName} height={24} src={icon} width={24} />
      </OsButton>
    </li>
  );
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
const styles = {
  ButtonOverride: css({
    outlineStyle: 'none',
  } as const),

  NotificationAreaItem: css({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '32px',
  } as const),
} as const;
