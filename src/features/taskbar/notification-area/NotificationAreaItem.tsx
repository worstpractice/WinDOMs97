import { Icon } from "components/Icon";
import { onLMB } from "event-filters/onLMB";
import { onRMB } from "event-filters/onRMB";
import { useProcessAlternatives } from "hooks/alternatives/useProcessAlternatives";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel/useKernel";
import { default as React } from "react";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { OS } from "typings/kernel/OS";
import type { LiLoader } from "typings/Loader";
import { moveInFront } from "utils/moveInFront";
import styles from "./NotificationAreaItem.module.css";

const selector = ({ activate, activeRef, closeMenus, minimize, openContextMenu, unMinimize }: OS) => ({
  activate,
  activeRef,
  closeMenus,
  minimize,
  openContextMenu,
  unMinimize,
});

type Props = {
  getProcess: LiLoader;
};

export const NotificationAreaItem: FC<Props> = ({ getProcess }) => {
  const { activate, activeRef, closeMenus, minimize, openContextMenu, unMinimize } = useKernel(selector);
  const notificationAreaItemRef = useOsRef<HTMLLIElement>();
  const process = getProcess(notificationAreaItemRef);
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
      minimize(process);
      activate({ current: null });
    } else {
      unMinimize(process);
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
