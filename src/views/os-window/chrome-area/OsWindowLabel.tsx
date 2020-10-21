import { Icon } from "components/Icon";
import { Title } from "components/Title";
import { useKernel } from "kernel";
import * as React from "react";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import styles from "./OsWindowLabel.module.css";

type Props = {
  process: Process;
};

export const OsWindowLabel: FC<Props> = ({ process }) => {
  const { activeRef } = useKernel();

  const { icon, name, osWindowRef } = process;

  const titleStyle = isRef(activeRef, osWindowRef) ? css(styles.Title, styles.Active) : styles.Title;

  return (
    <span className={styles.OsWindowLabel}>
      <Icon alt={name} className={styles.Icon} src={icon} />
      <Title className={titleStyle} of={name} />
    </span>
  );
};
