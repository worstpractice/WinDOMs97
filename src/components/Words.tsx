import type { CSSProperties } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { css } from "utils/css";
import styles from "./Words.module.css";

type Props = {
  className?: string;
  of: string;
  style?: CSSProperties;
};

/** I would name this component `Text`, but `Text` is already namesquatted by a DOM type, sending me straight to auto-import hell if I use that name too.
 *
 * So `Words` it is. */
export const Words: FC<Props> = ({ className = "", of, style }) => {
  const wordsStyle = css(styles.Words, className);

  return (
    <p className={wordsStyle} style={style}>
      {of}
    </p>
  );
};
