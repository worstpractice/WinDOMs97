import type { CSSProperties } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { css } from "utils/css";
import styles from "./Title.module.css";

type Props = {
  className?: string;
  of: string;
  style?: CSSProperties;
};

export const Title: FC<Props> = ({ className = "", of, style }) => {
  const titleStyle = css(styles.Title, className);

  return (
    <h1 className={titleStyle} style={style}>
      {of}
    </h1>
  );
};
