import { useMutableRef } from "hooks/useMutableRef";
import type { FC } from "react";
import React from "react";
import { useStore } from "store";
import { css } from "utils/css";
import { is } from "utils/is";
import { onLMB } from "utils/onLMB";
import styles from "./StartButton.module.css";

type Props = {
  onMouseDown: () => void;
};

export const StartButton: FC<Props> = ({ onMouseDown }) => {
  const { activate, activeRef } = useStore();
  const startButtonRef = useMutableRef();

  const handleActive = onLMB((e) => {
    // NOTE: Since the Taskbar under us runs `closeMenu` on mousedown, it's vital that we stop this event here -- or the Start menu cannot open.
    e.stopPropagation();
    activate(startButtonRef);
    onMouseDown();
  });

  const style = is(activeRef, startButtonRef) ? css(styles.StartButton, styles.Pressed) : styles.StartButton;

  return (
    <button className={style} id="StartButton" onMouseDown={handleActive} type="button" ref={startButtonRef as any}>
      <p className={styles.Title}>Start</p>
    </button>
  );
};
