import type { FC, MouseEventHandler } from "react";
import React, { useState } from "react";
import { css } from "utils/css";
import styles from "./WindowButton.module.css";

type Props =
  | {
      kind: "minimize" | "maximizeOrRestore";
      onExit?: never;
    }
  | {
      kind: "exit";
      onExit: () => void;
    };

export const WindowButton: FC<Props> = ({ kind, onExit }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleMouseDown: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsPressed(true);
  };

  const handleMouseLeave: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsPressed(false);
  };

  const handleMouseUp: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsPressed(false);
    onExit?.();
  };

  // prettier-ignore
  const pictogram = kind === "minimize"
    ? "_"
    : kind === "maximizeOrRestore"
      ? "#"
      : "X";

  const style = isPressed ? css(styles.WindowButton, styles.Pressed) : styles.WindowButton;

  return (
    <button
      className={style}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      type="button"
    >
      {pictogram}
    </button>
  );
};
