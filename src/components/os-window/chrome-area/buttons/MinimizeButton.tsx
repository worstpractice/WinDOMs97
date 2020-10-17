import { onLMB } from "event-filters/onLMB";
import type { FC } from "react";
import * as React from "react";
import { useState } from "react";
import { css } from "utils/css";
import styles from "./OsWindowButton.module.css";

type Props = {
  closeMenus: () => void;
  onMouseUp: () => void;
};

export const MinimizeButton: FC<Props> = ({ closeMenus, onMouseUp }) => {
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
      _
    </button>
  );
};