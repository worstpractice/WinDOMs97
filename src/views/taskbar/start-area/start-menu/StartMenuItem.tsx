import { Icon } from "components/Icon";
import { Words } from "components/Words";
import { onLMB } from "event-filters/onLMB";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import { default as React } from "react";
import type { FC } from "typings/FC";
import type { Linker } from "typings/Linker";
import styles from "./StartMenuItem.module.css";

type Props = {
  getBinary: Linker;
};

export const StartMenuItem: FC<Props> = ({ getBinary }) => {
  const { closeMenus, executeBinary } = useKernel();
  const startMenuItemRef = useOsRef<HTMLLIElement>();
  const binary = getBinary(startMenuItemRef);

  const handleLaunch = onLMB(() => {
    closeMenus();
    executeBinary(binary);
  });

  const { fileName, icon, name } = binary;

  return (
    <li className={styles.StartMenuItem} onMouseDown={handleLaunch} ref={startMenuItemRef}>
      <Icon alt={fileName} src={icon} width={64} />
      <Words of={name} />
    </li>
  );
};

// <div aria-hidden="true" style={{ fontSize: "8px" }}>
//  ►
// </div>
