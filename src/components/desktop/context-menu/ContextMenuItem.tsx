import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel";
import * as React from "react";
import type { FC } from "typings/FC";
import styles from "./ContextMenuItem.module.css";

type Props = {};

export const ContextMenuItem: FC<Props> = () => {
  const { closeMenus } = useKernel();

  const handleLaunch = onLMB<HTMLLIElement>(() => {
    closeMenus();
  });

  return (
    <li className={styles.ContextMenuItem} onMouseDown={handleLaunch}>
      <p>I'm a little Teapot</p>
    </li>
  );
};
