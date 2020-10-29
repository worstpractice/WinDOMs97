import { Icon } from "components/Icon";
import { onLMB } from "event-filters/onLMB";
import { onRMB } from "event-filters/onRMB";
import { useProcessAlternatives } from "hooks/alternatives/useProcessAlternatives";
import { useOsWindowControls } from "hooks/os-window/useOsWindowControls";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import { useActiveState } from "state/useActiveState";
import { useMenuState } from "state/useMenuState";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { LiLoader } from "typings/Loader";
import type { MenuState } from "typings/state/MenuState";
import { moveInFront } from "utils/moveInFront";
import styles from "./NotificationAreaItem.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fromMenu = ({ closeMenus, openContextMenu }: MenuState) => ({
  closeMenus,
  openContextMenu,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getProcess: LiLoader;
};

export const NotificationAreaItem: FC<Props> = ({ getProcess }) => {
  const { activate, activeRef } = useActiveState();
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const notificationAreaItemRef = useOsRef<HTMLLIElement>();
  const process = getProcess(notificationAreaItemRef);
  const { minimize, unMinimize } = useOsWindowControls(process);
  const alternatives = useProcessAlternatives(process);

  const handleContextMenu = onRMB<HTMLLIElement>(() => {
    openContextMenu(alternatives);
  });

  const handleMouseDown = onLMB<HTMLLIElement>((e) => {
    // NOTE: This is required since the event would bubble up and hand control back over to the taskbar (which we don't want).
    e.stopPropagation();
    closeMenus();

    const { osWindowRef } = process;

    if (isRef(activeRef, osWindowRef)) {
      minimize();
      activate({ current: null });
    } else {
      unMinimize();
      activate(process.osWindowRef);
      moveInFront(process.osWindowRef);
    }
  });

  const { icon, name } = process.binaryImage;

  return (
    <li
      className={styles.NotificationAreaItem}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      ref={notificationAreaItemRef}
    >
      <Icon alt={name} height={28} src={icon} width={28} />
    </li>
  );
};
