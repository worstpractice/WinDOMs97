import { onLMB } from "event-filters/onLMB";
import type { FC } from "react";
import React, { useState } from "react";
import { css } from "utils/css";
import styles from "./WindowButton.module.css";

const buttonKindsMap = {
  exit: "X",
  maximizeOrRestore: "#",
  minimize: "_",
} as const;

type Props =
  | {
      kind: "maximizeOrRestore";
      onExit?: never;
      onMinimize?: never;
    }
  | {
      kind: "minimize";
      onExit?: never;
      onMinimize: () => void;
    }
  | {
      kind: "exit";
      onExit: () => void;
      onMinimize?: never;
    };

export const WindowButton: FC<Props> = ({ kind, onExit, onMinimize }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = onLMB((e) => {
    // NOTE: This is necessary to stop the window from starting to move.
    e.stopPropagation();
    setIsPressed(true);
  });

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    onExit?.();
    onMinimize?.();
  };

  const style = isPressed ? css(styles.WindowButton, styles.Pressed) : styles.WindowButton;

  return (
    <button
      className={style}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      type="button"
    >
      {buttonKindsMap[kind]}
    </button>
  );
};
