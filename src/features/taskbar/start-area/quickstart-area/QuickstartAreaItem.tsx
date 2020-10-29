import { Icon } from "components/Icon";
import { switchOn } from "event-filters/delegate";
import { useExecuteBinary } from "hooks/syscalls/useExecuteBinary";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import { useMenuState } from "state/useMenuState";
import type { ButtonHandler } from "typings/ButtonHandler";
import type { FC } from "typings/FC";
import type { Linker } from "typings/Linker";
import type { MenuState } from "typings/state/MenuState";
import styles from "./QuickstartAreaItem.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fromMenu = ({ closeMenus }: MenuState) => ({
  closeMenus,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  getBinary: Linker;
};

export const QuickstartAreaItem: FC<Props> = ({ getBinary }) => {
  const { closeMenus } = useMenuState(fromMenu);
  const quickstartAreaItemRef = useOsRef<HTMLButtonElement>();
  const binary = getBinary(quickstartAreaItemRef);
  const executeBinary = useExecuteBinary(binary);

  const handleLMB = () => {
    executeBinary();
    closeMenus();
  };

  const handleRMB: ButtonHandler = (e) => {
    // NOTE: This is here because we want `QuickstartAreaItem` to support `ContextMenu` clicks.
    e.stopPropagation();
    // TODO: Import `Alternative` and get cracking on context menu options!
  };

  const { icon, name } = binary;

  return (
    <button
      className={styles.QuickstartAreaItem}
      onMouseDown={switchOn({ LMB: handleLMB, RMB: handleRMB })}
      type="button"
      ref={quickstartAreaItemRef}
    >
      <Icon alt={name} height={32} src={icon} width={32} />
    </button>
  );
};
