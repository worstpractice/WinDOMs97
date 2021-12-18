import type { CSSProperties, ReactNode } from 'react';
import { default as React, forwardRef, useState } from 'react';
import { onLmb } from 'src/event-filters/onLmb';
import { useIsPressed } from 'src/hooks/useIsPressed';
import { INTERACTIVE } from 'src/styles/INTERACTIVE';
import type { ButtonHandler } from 'src/typings/ButtonHandler';
import { css } from 'src/utils/as/css';
import { toFalse } from 'src/utils/setters/toFalse';
import { toTrue } from 'src/utils/setters/toTrue';

type Props = {
  readonly children?: ReactNode;
  /** NOTE: this hides the button outline. */
  readonly discreet?: boolean;
  readonly onContextMenu?: ButtonHandler;
  readonly onMouseDown?: ButtonHandler;
  readonly onMouseUp?: ButtonHandler;
  readonly style?: CSSProperties;
};

export const OsButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children, discreet, onMouseDown, onMouseUp, style, ...remainingProps } = props;
  const [isPressed, setIsPressed] = useIsPressed(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = onLmb<HTMLButtonElement>((event): void => {
    setIsPressed(toTrue);

    onMouseDown?.(event);
  });

  const handleMouseUp = onLmb<HTMLButtonElement>((event): void => {
    if (!isPressed) return;

    setIsPressed(toFalse);

    onMouseUp?.(event);
  });

  const handleMouseEnter = (): void => {
    setIsHovered(toTrue);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(toFalse);
  };

  return (
    <button
      //
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={ref}
      style={{
        //
        ...styles.OsButton,
        outlineStyle: isPressed ? (isHovered ? 'outset' : 'inset') : 'inset',
        ...style,
      }}
      type="button"
      {...remainingProps}
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
    textAlign: 'center',
    ...INTERACTIVE,
  } as const),
} as const;
