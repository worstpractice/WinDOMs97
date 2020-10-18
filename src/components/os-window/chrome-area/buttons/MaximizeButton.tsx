import { onLMB } from "event-filters/onLMB";
import { useKernel } from "kernel";
import type { FC } from "react";
import * as React from "react";
import { useState } from "react";
import { css } from "utils/css";
import styles from "./OsWindowButton.module.css";

type Props = {
  onMouseUp: () => void;
};

export const MaximizeButton: FC<Props> = ({ onMouseUp }) => {
  const { closeMenus } = useKernel();
  const [isPressed, setIsPressed] = useState(false);

  const style = isPressed ? css(styles.OsWindowButton, styles.Pressed) : styles.OsWindowButton;

  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
    // NOTE: This is necessary to stop the `OsWindow` from starting to move.
    e.stopPropagation();
    closeMenus();
    setIsPressed(true);
  });

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleMouseUp = onLMB<HTMLButtonElement>(() => {
    if (isPressed) {
      onMouseUp();
    }
  });

  return (
    <button
      className={style}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      type="button"
    >
      #
    </button>
  );
};
