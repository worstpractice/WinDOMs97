import { Words } from "components/Words";
import { onLMB } from "event-filters/onLMB";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import * as React from "react";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import { css } from "utils/css";
import styles from "./StartButton.module.css";

type Props = {};

export const StartButton: FC<Props> = () => {
  const { activate, activeRef, toggleStartMenu } = useKernel();
  const startButtonRef = useOsRef<HTMLButtonElement>();

  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
    // NOTE: Since the Taskbar under us runs `closeMenu` on mousedown, it's vital that we stop this event here -- or the Start menu cannot open.
    e.stopPropagation();
    activate(startButtonRef);
    toggleStartMenu();
  });

  const style = isRef(activeRef, startButtonRef) ? css(styles.StartButton, styles.Pressed) : styles.StartButton;

  return (
    <button className={style} onMouseDown={handleMouseDown} type="button" ref={startButtonRef}>
      <Words of={"Start"} />
    </button>
  );
};
