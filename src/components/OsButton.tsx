import type { CSSProperties, ReactNode } from 'react';
import { default as React, forwardRef, useState } from 'react';
import { onLMB } from 'src/event-filters/onLMB';
import type { ButtonHandler } from 'src/typings/ButtonHandler';
import { css } from 'src/utils/css';
import styles from './OsButton.module.css';

type Props = {
  children?: ReactNode;
  className?: string | undefined;
  /** NOTE: This hides the button outline. */
  isDiscreet?: boolean;
  onContextMenu?: ButtonHandler;
  onMouseDown?: ButtonHandler;
  onMouseLeave?: ButtonHandler;
  onMouseUp?: ButtonHandler;
  style?: CSSProperties;
};

export const OsButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children, className, isDiscreet, onMouseDown, onMouseLeave, onMouseUp, style, ...rest } = props;
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

  const osButtonStyle = css(styles.OsButton ?? '', (isPressed ? styles.Pressed : '') ?? '', className || '', isDiscreet ? styles.Discreet : '');

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

OsButton.displayName = 'OsButton';
