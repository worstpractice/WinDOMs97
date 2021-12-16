import type { CSSProperties, ReactNode } from 'react';
import { default as React, forwardRef, useState } from 'react';
import { onLMB } from 'src/event-filters/onLMB';
import type { ButtonHandler } from 'src/typings/ButtonHandler';
import { css } from 'src/utils/as/css';
import { toFalse } from 'src/utils/setters/toFalse';
import { toTrue } from 'src/utils/setters/toTrue';

type Props = {
  readonly children?: ReactNode;
  /** NOTE: This hides the button outline. */
  readonly discreet?: boolean;
  readonly onContextMenu?: ButtonHandler;
  readonly onMouseDown?: ButtonHandler;
  readonly onMouseUp?: ButtonHandler;
  readonly pressed?: boolean;
  readonly style?: CSSProperties;
};

export const OsButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children, discreet, onMouseDown, onMouseUp, pressed, style, ...rest } = props;
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = onLMB<HTMLButtonElement>((e) => {
    setIsPressed(toTrue);

    onMouseDown?.(e);
  });

  const handleMouseUp = onLMB<HTMLButtonElement>((e) => {
    setIsPressed(toFalse);

    onMouseUp?.(e);
  });

  return (
    <button
      //
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={ref}
      style={{
        //
        ...styles.OsButton,
        outlineStyle: pressed || isPressed ? 'outset' : 'inset',
        ...style,
      }}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
});

/** NOTE: `forwardRef`s require this. */
OsButton.displayName = 'OsButton';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  OsButton: css({
    alignItems: 'center',
    backgroundColor: 'var(--gray)',
    display: 'flex',
    fontSize: '20px',
    justifyContent: 'center',
    outlineColor: 'var(--oswindow-outline)',
    outlineStyle: 'inset',
    outlineWidth: '4px',
  } as const),
} as const;
