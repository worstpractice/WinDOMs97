import { onLMB } from "event-filters/onLMB";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import * as React from "react";
import type { Binary } from "typings/Binary";
import type { FC } from "typings/FC";
import styles from "./ContextMenuItem.module.css";

type Props = {
  binary: Binary;
  closeMenus: () => void;
};

export const ContextMenuItem: FC<Props> = ({ binary, closeMenus }) => {
  const { executeBinary } = useKernel();
  const contextMenuItemRef = useOsRef<HTMLLIElement>();

  // NOTE: This is vital. This is the line where each `Binary` is given its very own `ContextMenuItem` handle.
  binary.contextMenuItemRef = contextMenuItemRef;

  const handleLaunch = onLMB<HTMLLIElement>(() => {
    closeMenus();
    executeBinary(binary);
  });

  const { fileName, icon, name } = binary;

  return (
    <li className={styles.ContextMenuItem} onMouseDown={handleLaunch} ref={contextMenuItemRef}>
      <img alt={fileName} className={styles.Icon} loading="eager" src={icon} />
      {name}
    </li>
  );
};
