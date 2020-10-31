import type { CSSProperties } from "react";
import { default as React, useMemo } from "react";
import type { FC } from "typings/FC";
import { css } from "utils/css";
import styles from "./Icon.module.css";

type Props = {
  alt: string;
  className?: string;
  height: number;
  src: string;
  style?: CSSProperties;
  width: number;
};

export const Icon: FC<Props> = ({ alt, className = "", height, src, style, width }) => {
  const iconStyle = useMemo(() => css(styles.Icon, className), [className]);

  return <img alt={alt} className={iconStyle} height={height} loading="eager" src={src} style={style} width={width} />;
};
