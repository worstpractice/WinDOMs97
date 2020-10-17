import { onLMB } from "event-filters/onLMB";
import type { FC } from "react";
import * as React from "react";
import { useState } from "react";
import { css } from "utils/css";
import styles from "./WindowButton.module.css";

type Props = {
  closeMenus: () => void;
  onMouseUp: () => void;
};

export const ExitButton: FC<Props> = ({ closeMenus, onMouseUp }) => {
  const [isPressed, setIsPressed] = useState(false);

  const style = isPressed ? css(styles.WindowButton, styles.Pressed) : styles.WindowButton;

  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
    // NOTE: This is necessary to stop the window from starting to move.
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
      X
    </button>
  );
};
