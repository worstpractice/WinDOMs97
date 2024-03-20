import type { CSSProperties } from 'react';
import { default as React } from 'react';
import { css } from 'src/utils/as/css';
import { keyOf } from 'src/utils/as/keyOf';

type Props = {
  readonly direction: 'horizontal' | 'vertical';
} & (
  | {
      readonly dent: 'in' | 'out';
      readonly stocky?: never;
    }
  | {
      readonly dent?: never;
      readonly stocky: boolean;
    }
);

/** Maps visually to breadth. Set via height or width depending on direction (horizontal or vertical). */
const STOCKY_BREADTH = '2px';

/** Maps visually to length. Set via height or width depending on direction (horizontal or vertical). */
const STOCKY_LENGTH = '80%';

/** Maps visually to free space surrounding the divider. Set via paddingTop or paddingLeft depending on direction (horizontal or vertical). */
const STOCKY_FREE_SPACE = '5px';

export const Divider = ({ dent, direction, stocky }: Props) => {
  const isHorizontal = direction === 'horizontal';

  const style = css({
    ...styles.Divider,
    ...(dent === 'in' && styles.In),
    ...(dent === 'out' && styles.Out),
    ...(isHorizontal ? styles.Horizontal : styles.Vertical),
    ...(stocky &&
      ({
        height: isHorizontal ? STOCKY_BREADTH : STOCKY_LENGTH,
        outlineStyle: 'inset',
        [isHorizontal ? keyOf<CSSProperties>('paddingLeft') : keyOf<CSSProperties>('paddingTop')]: STOCKY_FREE_SPACE,
        width: isHorizontal ? STOCKY_LENGTH : STOCKY_BREADTH,
      } as const)),
  } as const);

  return (
    <aside
      //
      style={style}
    />
  );
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
const styles = {
  Divider: css({
    outlineColor: 'var(--oswindow-outline)',
    outlineWidth: '2px',
  } as const),

  Horizontal: css({
    width: '100%',
  } as const),

  In: css({
    outlineStyle: 'outset',
  } as const),

  Out: css({
    outlineStyle: 'inset',
  } as const),

  Vertical: css({
    height: '100%',
  } as const),
} as const;
