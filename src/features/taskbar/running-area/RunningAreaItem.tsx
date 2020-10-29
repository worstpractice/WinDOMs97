import { Icon } from "components/Icon";
import { Words } from "components/Words";
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
import type { ButtonLoader } from "typings/Loader";
import type { MenuState } from "typings/state/MenuState";
import { css } from "utils/css";
import { moveInFront } from "utils/moveInFront";
import styles from "./RunningAreaItem.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fromMenu = ({ closeMenus, openContextMenu }: MenuState) => ({
  closeMenus,
  openContextMenu,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getProcess: ButtonLoader;
};

export const RunningAreaItem: FC<Props> = ({ getProcess }) => {
  const { activate, activeRef } = useActiveState();
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const runningAreaItemRef = useOsRef<HTMLButtonElement>();
  const process = getProcess(runningAreaItemRef);
  const { minimize, unMinimize } = useOsWindowControls(process);
  const alternatives = useProcessAlternatives(process);

  const handleContextMenu = onRMB(() => {
    openContextMenu(alternatives);
  });

  const handleMouseDown = onLMB((e) => {
    // NOTE: This event should not reach the `Taskbar` below, or it will become active instead of the `OsWindow` we meant to activate.
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

  const { binaryImage, osWindowRef } = process;
  const { icon, name } = binaryImage;

  const buttonStyle = isRef(activeRef, osWindowRef)
    ? css(styles.RunningAreaItem, styles.Active)
    : styles.RunningAreaItem;

  return (
    <button
      className={buttonStyle}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      ref={runningAreaItemRef}
      type="button"
    >
      <Icon alt={name} height={20} src={icon} width={20} />
      <Words of={name} style={{ fontSize: "18px" }} />
    </button>
  );
};
