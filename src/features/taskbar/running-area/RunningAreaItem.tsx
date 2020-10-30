import { Icon } from "components/Icon";
import { OutsetButton } from "components/OutsetButton";
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
import type { ActiveState } from "typings/state/ActiveState";
import type { MenuState } from "typings/state/MenuState";
import { moveInFront } from "utils/moveInFront";
import styles from "./RunningAreaItem.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activate, activeRef }: ActiveState) => ({
  activate,
  activeRef,
});

const fromMenu = ({ closeMenus, openContextMenu }: MenuState) => ({
  closeMenus,
  openContextMenu,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getProcess: ButtonLoader;
};

export const RunningAreaItem: FC<Props> = ({ getProcess }) => {
  const { activate, activeRef } = useActiveState(fromActive);
  const { closeMenus, openContextMenu } = useMenuState(fromMenu);
  const runningAreaItemRef = useOsRef<HTMLButtonElement>();
  const process = getProcess(runningAreaItemRef);
  const alternatives = useProcessAlternatives(process);
  const { minimize, unMinimize } = useOsWindowControls(process);

  const handleContextMenu = onRMB<HTMLButtonElement>(() => {
    openContextMenu(alternatives);
  });

  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
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

  const { binaryImage } = process;
  const { icon, name } = binaryImage;

  return (
    <OutsetButton
      className={styles.RunningAreaItem}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      ref={runningAreaItemRef}
    >
      <Icon alt={name} height={20} src={icon} width={20} />
      <Words of={name} style={{ fontSize: "18px" }} />
    </OutsetButton>
  );
};
