import type { CSSProperties } from 'react';
import { default as React } from 'react';
import { css } from 'src/utils/css';
import styles from './Icon.module.css';

type Props = {
  alt: string;
  className?: string | undefined;
  height: number;
  src: string;
  style?: CSSProperties;
  width: number;
};

export const Icon = ({ alt, className = '', height, src, style, width }: Props) => {
  const iconStyle = css(styles.Icon ?? '', className);

  return <img alt={alt} className={iconStyle} height={height} loading="eager" src={src} style={style} width={width} />;
};
