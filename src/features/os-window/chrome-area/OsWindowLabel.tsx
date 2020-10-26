import { Icon } from "components/Icon";
import { Title } from "components/Title";
import { useKernel } from "kernel/useKernel";
import { default as React } from "react";
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

  const { binaryImage, osWindowRef } = process;
  const { icon, name } = binaryImage;

  const titleStyle = isRef(activeRef, osWindowRef) ? css(styles.Title, styles.Active) : styles.Title;

  return (
    <header className={styles.OsWindowLabel}>
      <Icon alt={name} className={styles.Icon} height={32} src={icon} width={32} />
      <Title className={titleStyle} of={name} />
    </header>
  );
};
