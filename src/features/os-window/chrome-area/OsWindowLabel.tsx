import { Icon } from "components/Icon";
import { Title } from "components/Title";
import { default as React } from "react";
import { useActiveState } from "state/useActiveState";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import type { ActiveState } from "typings/state/ActiveState";
import { css } from "utils/css";
import styles from "./OsWindowLabel.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activeRef }: ActiveState) => ({
  activeRef,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const activeStyle = css(styles.Title, styles.Active);

type Props = {
  process: Process;
};

export const OsWindowLabel: FC<Props> = ({ process }) => {
  const { activeRef } = useActiveState(fromActive);

  const { binaryImage, osWindowRef } = process;
  const { icon, programName } = binaryImage;

  const style = isRef(activeRef, osWindowRef) ? activeStyle : styles.Title;

  return (
    <header className={styles.OsWindowLabel}>
      <Icon alt={programName} className={styles.Icon} height={32} src={icon} width={32} />
      <Title className={style} of={programName} />
    </header>
  );
};
