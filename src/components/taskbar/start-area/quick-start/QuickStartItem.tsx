import { onLMB } from "event-filters/onLMB";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import * as React from "react";
import type { Binary } from "typings/Binary";
import type { FC } from "typings/FC";
import styles from "./QuickStartItem.module.css";

type Props = {
  binary: Binary;
};

export const QuickStartItem: FC<Props> = ({ binary }) => {
  const { closeMenus, executeBinary } = useKernel();
  const quickStartItemRef = useOsRef<HTMLLIElement>();

  // NOTE: This is vital. This is the line where each `Binary` is given its very own `ContextMenuItem` handle.
  binary.quickStartItemRef = quickStartItemRef;

  const handleLaunch = onLMB<HTMLButtonElement>(() => {
    executeBinary(binary);
    closeMenus();
  });

  const { fileName, icon } = binary;

  return (
    <button className={styles.QuickStartItem} onMouseDown={handleLaunch} type="button">
      <img alt={fileName} className={styles.Icon} loading="eager" src={icon} />
    </button>
  );
};
