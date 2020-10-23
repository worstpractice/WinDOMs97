import type { CSSProperties } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { css } from "utils/css";
import styles from "./Separator.module.css";

type Props = {
  direction: "horizontal" | "vertical";
} & (
  | {
      dent: "in" | "out";
      isStocky?: never;
    }
  | {
      dent?: never;
      isStocky: boolean;
    }
);

export const Separator: FC<Props> = ({ dent, direction, isStocky = false }) => {
  const isDentedIn = dent === "in";
  const isHorizontal = direction === "horizontal";

  const style = css(
    styles.Separator,
    isDentedIn ? styles.In : styles.Out,
    isHorizontal ? styles.Horizontal : styles.Vertical,
  );

  const override: CSSProperties = {};

  if (isStocky) {
    override.outlineStyle = "outset";
    if (isHorizontal) {
      override.width = "80%";
      override.height = "5px";
    } else {
      override.height = "80%";
      override.width = "5px";
    }
  }

  return <aside className={style} style={override} />;
};
