import { useDomRef } from "hooks/useDomRef";
import { useKernel } from "kernel";
import type { ReactNode } from "react";
import * as React from "react";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import { css } from "utils/css";
import styles from "./ChromeArea.module.css";

type Props = {
  children: ReactNode;
  process: Process;
};

export const ChromeArea: FC<Props> = ({ children, process }) => {
  const { activeRef } = useKernel();
  const chromeAreaRef = useDomRef<HTMLElement>();

  // NOTE: This is vital. This is the line where each process is given its very own `ChromeArea` handle.
  process.chromeAreaRef = chromeAreaRef;

  const { windowRef } = process;

  const style = isRef(activeRef, windowRef) ? css(styles.ChromeArea, styles.Active) : styles.ChromeArea;

  return (
    <header className={style} ref={chromeAreaRef}>
      {children}
    </header>
  );
};
