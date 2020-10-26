import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel/useKernel";
import type { ReactNode } from "react";
import { default as React } from "react";
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
  const chromeAreaRef = useOsRef<HTMLElement>();
  
  // NOTE: This is vital. This is the line where each `Process` is given its very own `ChromeArea` handle.
  process.chromeAreaRef = chromeAreaRef;

  const { osWindowRef } = process;

  const style = isRef(activeRef, osWindowRef) ? css(styles.ChromeArea, styles.Active) : styles.ChromeArea;

  return (
    <header className={style} ref={chromeAreaRef}>
      {children}
    </header>
  );
};
