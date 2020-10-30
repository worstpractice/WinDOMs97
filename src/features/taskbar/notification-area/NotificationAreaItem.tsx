import { Icon } from "components/Icon";
import { OsButton } from "components/OsButton";
import { onLMB } from "event-filters/onLMB";
import { onRMB } from "event-filters/onRMB";
import { useProcessAlternatives } from "hooks/alternatives/useProcessAlternatives";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import { useActiveState } from "state/useActiveState";
import { useMenuState } from "state/useMenuState";
import type { FC } from "typings/FC";
import type { LiLoader } from "typings/Loader";
import type { ActiveState } from "typings/state/ActiveState";
import type { MenuState } from "typings/state/MenuState";
import { bringToFront } from "utils/bringToFront";
import styles from "./NotificationAreaItem.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activate }: ActiveState) => ({
  activate,
});

const fromMenu = ({ closeMenus, openContextMenu }: MenuState) => ({
  closeMenus,
  openContextMenu,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getProcess: LiLoader;
};

export const NotificationAreaItem: FC<Props> = ({ getProcess }) => {
  const { activate } = useActiveState(fromActive);
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
    activate(process.osWindowRef);
    bringToFront(process.osWindowRef);
  });

  const { icon, name } = process.binaryImage;

  return (
    <li className={styles.NotificationAreaItem} ref={notificationAreaItemRef}>
      <OsButton className={styles.ButtonOverride} onContextMenu={handleContextMenu} onMouseDown={handleMouseDown}>
        <Icon alt={name} height={24} src={icon} width={24} />
      </OsButton>
    </li>
  );
};
