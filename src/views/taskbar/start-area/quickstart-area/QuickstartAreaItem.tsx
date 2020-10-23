import { Icon } from "components/Icon";
import { delegate } from "event-filters/delegate";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import { default as React } from "react";
import type { Binary } from "typings/Binary";
import type { ButtonHandler } from "typings/ButtonHandler";
import type { FC } from "typings/FC";
import styles from "./QuickstartAreaItem.module.css";

type Props = {
  binary: Binary;
};

export const QuickstartAreaItem: FC<Props> = ({ binary }) => {
  const { closeMenus, executeBinary } = useKernel();
  const quickstartAreaItemRef = useOsRef<HTMLButtonElement>();

  // NOTE: This is vital. This is the line where each `Binary` is given its very own `QuickstartAreaItem` handle.
  binary.quickstartAreaItemRef = quickstartAreaItemRef;

  const handleLMB = () => {
    executeBinary(binary);
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
      onMouseDown={delegate({ onLMB: handleLMB, onRMB: handleRMB })}
      type="button"
      ref={quickstartAreaItemRef}
    >
      <Icon alt={name} src={icon} style={{ paddingBottom: "8px" }} width={40} />
    </button>
  );
};
