import type { CSSProperties } from 'react';
import { css } from 'utils/css';
import styles from './Words.module.css';

type Props = {
  className?: string | undefined;
  of: string;
  style?: CSSProperties;
};

/** I would name this component `Text`, but `Text` is already namesquatted by a DOM type, sending me straight to auto-import hell if I use that name too.
 *
 * So `Words` it is. */
export const Words = ({ className = '', of, style }: Props) => {
  const wordsStyle = css(styles.Words ?? '', className);

  return (
    <p className={wordsStyle} style={style}>
      {of}
    </p>
  );
};
