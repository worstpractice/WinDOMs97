import { Icon } from "components/Icon";
import { switchOn } from "event-filters/delegate";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel/useKernel";
import { default as React } from "react";
import type { ButtonHandler } from "typings/ButtonHandler";
import type { FC } from "typings/FC";
import type { OS } from "typings/kernel/OS";
import type { Linker } from "typings/Linker";
import styles from "./QuickstartAreaItem.module.css";

const selector = ({ closeMenus, executeBinary }: OS) => ({
  closeMenus,
  executeBinary,
});

type Props = {
  getBinary: Linker;
};

export const QuickstartAreaItem: FC<Props> = ({ getBinary }) => {
  const { closeMenus, executeBinary } = useKernel(selector);
  const quickstartAreaItemRef = useOsRef<HTMLButtonElement>();
  const binary = getBinary(quickstartAreaItemRef);

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
      onMouseDown={switchOn({ LMB: handleLMB, RMB: handleRMB })}
      type="button"
      ref={quickstartAreaItemRef}
    >
      <Icon alt={name} height={32} src={icon} width={32} />
    </button>
  );
};
