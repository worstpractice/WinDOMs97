import { Icon } from "components/Icon";
import { Title } from "components/Title";
import { useKernel } from "kernel/useKernel";
import { default as React } from "react";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { OS } from "typings/kernel/OS";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import styles from "./OsWindowLabel.module.css";

const selector = ({ activeRef }: OS) => ({
  activeRef,
});

const titleStyle = styles.Title;
const activeTitleStyle = css(styles.Title, styles.Active);

type Props = {
  process: Process;
};

export const OsWindowLabel: FC<Props> = ({ process }) => {
  const { activeRef } = useKernel(selector);

  const { binaryImage, osWindowRef } = process;
  const { icon, name } = binaryImage;

  const style = isRef(activeRef, osWindowRef) ? activeTitleStyle : titleStyle;

  return (
    <header className={styles.OsWindowLabel}>
      <Icon alt={name} className={styles.Icon} height={32} src={icon} width={32} />
      <Title className={style} of={name} />
    </header>
  );
};
