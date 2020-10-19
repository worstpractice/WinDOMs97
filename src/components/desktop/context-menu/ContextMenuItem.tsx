import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel";
import * as React from "react";
import type { Alternative } from "typings/Alternative";
import type { FC } from "typings/FC";
import styles from "./ContextMenuItem.module.css";

type Props = {
  alternative: Alternative;
};

export const ContextMenuItem: FC<Props> = ({ alternative }) => {
  const { closeMenus } = useKernel();

  const { label, action } = alternative;

  console.log(alternative);

  const handleMouseDown = onLMB<HTMLLIElement>(() => {
    closeMenus();
    action();
  });

  return (
    <li className={styles.ContextMenuItem} onMouseDown={handleMouseDown}>
      <p style={{ pointerEvents: "none" }}>{label}</p>
    </li>
  );
};
