import type { CSSProperties } from 'react';
import { default as React } from 'react';
import { css } from 'src/utils/as/css';

type Props = {
  readonly of: string;
  readonly style?: CSSProperties;
};

export const Title = ({ of, style }: Props) => {
  return (
    <h1
      //
      style={style ? { ...styles.Title, ...style } : styles.Title}
    >
      {of}
    </h1>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Title: css({
    pointerEvents: 'none',
  } as const),
} as const;
