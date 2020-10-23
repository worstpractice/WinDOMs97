import type { CSSProperties, FC } from "react";
import { default as React } from "react";
import { css } from "utils/css";
import styles from "./Icon.module.css";

type Props = {
  alt: string;
  className?: string;
  height?: number;
  src: string;
  style?: CSSProperties;
  width?: number;
};

export const Icon: FC<Props> = ({ alt, className = "", height, src, style, width }) => {
  const iconStyle = css(styles.Icon, className);

  return <img alt={alt} className={iconStyle} height={height} loading="eager" src={src} style={style} width={width} />;
};
