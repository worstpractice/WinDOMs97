import type { CSSProperties } from 'react';
import { default as React } from 'react';
import { css } from 'src/utils/as/css';

type Props = {
  readonly alt: string;
  readonly height: number;
  readonly src: string;
  readonly style?: CSSProperties;
  readonly width: number;
};

export const Icon = ({ alt, height, src, style, width }: Props) => {
  return (
    <img
      //
      alt={alt}
      draggable={false}
      height={height}
      loading="eager"
      src={src}
      style={{ ...styles.Icon, ...style }}
      width={width}
    />
  );
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
const styles = {
  Icon: css({
    objectFit: 'contain',
  } as const),
} as const;
