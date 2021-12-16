import type { CSSProperties } from 'react';
import { default as React } from 'react';
import { css } from 'src/utils/as/css';

type Props = {
  readonly of: string;
  readonly style?: CSSProperties;
};

/** I would name this component `Text`, but `Text` is already namesquatted by a DOM type, sending me straight to auto-import hell if I use that name too.
 *
 * So `Words` it is. */
export const Words = ({ of, style }: Props) => {
  return (
    <p
      //
      style={style ? { ...styles.Words, ...style } : styles.Words}
    >
      {of}
    </p>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Words: css({
    pointerEvents: 'none',
  } as const),
} as const;
