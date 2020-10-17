import { onLMB } from "event-filters/onLMB";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import * as React from "react";
import type { Binary } from "typings/Binary";
import type { FC } from "typings/FC";
import styles from "./StartMenuItem.module.css";

type Props = {
  binary: Binary;
  closeMenus: () => void;
};

export const StartMenuItem: FC<Props> = ({ binary, closeMenus }) => {
  const { executeBinary } = useKernel();
  const startMenuItemRef = useOsRef<HTMLLIElement>();

  // NOTE: This is vital. This is the line where each `Binary` is given its very own `ContextMenuItem` handle.
  binary.startMenuItemRef = startMenuItemRef;

  const handleLaunch = onLMB(() => {
    closeMenus();
    executeBinary(binary);
  });

  const { fileName, icon, name } = binary;

  return (
    <li className={styles.StartMenuItem} onMouseDown={handleLaunch} ref={startMenuItemRef}>
      <img alt={fileName} className={styles.StartMenuItemIcon} loading="eager" src={icon} />
      {name}
    </li>
  );
};

// <div aria-hidden="true" style={{ fontSize: "8px" }}>
//  ►
// </div>
