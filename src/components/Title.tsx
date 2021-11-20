import type { CSSProperties } from 'react';
import { default as React } from 'react';
import { css } from 'src/utils/css';
import styles from './Title.module.css';

type Props = {
  className?: string | undefined;
  of: string;
  style?: CSSProperties;
};

export const Title = ({ className = '', of, style }: Props) => {
  const titleStyle = css(styles.Title ?? '', className);

  return (
    <h1 className={titleStyle} style={style}>
      {of}
    </h1>
  );
};
