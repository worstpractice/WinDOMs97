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
      kind: "minimize" | "maximizeOrRestore";
      onExit?: never;
    }
  | {
      kind: "exit";
      onExit: () => void;
    };

export const WindowButton: FC<Props> = ({ kind, onExit }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    onExit?.();
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
