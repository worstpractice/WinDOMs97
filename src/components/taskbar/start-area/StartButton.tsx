import { onLMB } from "event-filters/onLMB";
import { useMutableRef } from "hooks/useMutableRef";
import { useKernel } from "kernel";
import type { FC } from "react";
import React from "react";
import { isRef } from "type-predicates/isRef";
import { css } from "utils/css";
import styles from "./StartButton.module.css";

type Props = {
  onMouseDown: () => void;
};

export const StartButton: FC<Props> = ({ onMouseDown }) => {
  const { activate, activeRef } = useKernel();
  const startButtonRef = useMutableRef();

  const handleActive = onLMB((e) => {
    // NOTE: Since the Taskbar under us runs `closeMenu` on mousedown, it's vital that we stop this event here -- or the Start menu cannot open.
    e.stopPropagation();
    activate(startButtonRef);
    onMouseDown();
  });

  const style = isRef(activeRef, startButtonRef) ? css(styles.StartButton, styles.Pressed) : styles.StartButton;

  return (
    <button className={style} id="StartButton" onMouseDown={handleActive} type="button" ref={startButtonRef as any}>
      <p className={styles.Title}>Start</p>
    </button>
  );
};
