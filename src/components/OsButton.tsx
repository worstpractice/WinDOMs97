import { onLMB } from "event-filters/onLMB";
import type { CSSProperties, ReactNode } from "react";
import { default as React, forwardRef, useMemo, useState } from "react";
import type { ButtonHandler } from "typings/ButtonHandler";
import { ButtonProps } from "typings/props/ButtonProps";
import { css } from "utils/css";
import styles from "./OsButton.module.css";

type Props = Omit<ButtonProps, "type"> & {
  children?: ReactNode;
  className?: string;
  onContextMenu?: ButtonHandler;
  onMouseDown?: ButtonHandler;
  onMouseLeave?: ButtonHandler;
  onMouseUp?: ButtonHandler;
  style?: CSSProperties;
};

// prettier-ignore
export const OsButton = forwardRef<HTMLButtonElement, Props>(({ children, className, onMouseDown, onMouseLeave, onMouseUp, style, ...rest }, ref) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
    setIsPressed(true);

    onMouseDown?.(e);
  });

  const handleMouseLeave: ButtonHandler = (e) => {
    if (!isPressed) return;

    setIsPressed(false);

    onMouseLeave?.(e);
  };

  const handleMouseUp = onLMB<HTMLButtonElement>((e) => {
    if (!isPressed) return;

    setIsPressed(false);

    onMouseUp?.(e);
  });

  const osButtonStyle = useMemo(() => css(
    styles.OsButton,
    isPressed ? styles.Pressed : "",
    className ? className : "",
  ), [className, isPressed]);

  return (
    <button
      className={osButtonStyle}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      ref={ref}
      style={style}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
});
