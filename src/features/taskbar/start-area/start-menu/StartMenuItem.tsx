import { Icon } from "components/Icon";
import { Words } from "components/Words";
import { onLMB } from "event-filters/onLMB";
import { useExecuteBinary } from "hooks/syscalls/useExecuteBinary";
import { useOsRef } from "hooks/useOsRef";
import { default as React } from "react";
import { useMenuState } from "state/useMenuState";
import type { FC } from "typings/FC";
import type { Linker } from "typings/Linker";
import type { MenuState } from "typings/state/MenuState";
import styles from "./StartMenuItem.module.css";

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

export const StartMenuItem: FC<Props> = ({ getBinary }) => {
  const { closeMenus } = useMenuState(fromMenu);
  const startMenuItemRef = useOsRef<HTMLLIElement>();
  const binary = getBinary(startMenuItemRef);
  const executeBinary = useExecuteBinary(binary);

  const handleLaunch = onLMB(() => {
    closeMenus();
    executeBinary();
  });

  const { fileName, icon, programName } = binary;

  return (
    <li className={styles.StartMenuItem} onMouseDown={handleLaunch} ref={startMenuItemRef}>
      <Icon alt={fileName} height={64} src={icon} width={64} />
      <Words of={programName} />
    </li>
  );
};

// <div aria-hidden="true" style={{ fontSize: "8px" }}>
//  ►
// </div>
