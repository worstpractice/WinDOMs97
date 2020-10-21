import { Icon } from "components/Icon";
import { onLMB } from "event-filters/onLMB";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import * as React from "react";
import type { Binary } from "typings/Binary";
import type { FC } from "typings/FC";
import styles from "./QuickstartAreaItem.module.css";

type Props = {
  binary: Binary;
};

export const QuickstartAreaItem: FC<Props> = ({ binary }) => {
  const { closeMenus, executeBinary } = useKernel();
  const quickstartAreaItemRef = useOsRef<HTMLLIElement>();

  // NOTE: This is vital. This is the line where each `Binary` is given its very own `ContextMenuItem` handle.
  binary.quickstartAreaItemRef = quickstartAreaItemRef;

  const handleLaunch = onLMB<HTMLButtonElement>(() => {
    executeBinary(binary);
    closeMenus();
  });

  const { icon, name } = binary;

  return (
    <button className={styles.QuickstartAreaItem} onMouseDown={handleLaunch} type="button">
      <Icon alt={name} src={icon} style={{ paddingBottom: "8px" }} width={40} />
    </button>
  );
};
