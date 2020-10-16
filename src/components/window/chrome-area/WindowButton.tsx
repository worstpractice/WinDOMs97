import { onLMB } from "event-filters/onLMB";
import { useDomRef } from "hooks/useDomRef";
import type { FC } from "react";
import * as React from "react";
import { useState } from "react";
import type { OsRef } from "typings/OsRef";
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
      onMaximizeOrRestore: (buttonRef: OsRef<HTMLButtonElement>) => void;
      onMinimize?: never;
    }
  | {
      kind: "minimize";
      onExit?: never;
      onMaximizeOrRestore?: never;
      onMinimize: () => void;
    }
  | {
      kind: "exit";
      onExit: () => void;
      onMaximizeOrRestore?: never;
      onMinimize?: never;
    };

export const WindowButton: FC<Props> = ({ kind, onExit, onMaximizeOrRestore, onMinimize }) => {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useDomRef<HTMLButtonElement>();

  const handleMouseDown = onLMB((e) => {
    // NOTE: This is necessary to stop the window from starting to move.
    e.stopPropagation();
    setIsPressed(true);
  });

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleMouseUp = onLMB(() => {
    setIsPressed(false);
    onExit?.();
    onMaximizeOrRestore?.(buttonRef);
    onMinimize?.();
  });

  const style = isPressed ? css(styles.WindowButton, styles.Pressed) : styles.WindowButton;

  return (
    <button
      className={style}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      ref={buttonRef}
      type="button"
    >
      {buttonKindsMap[kind]}
    </button>
  );
};
