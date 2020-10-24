import type { CSSProperties } from "react";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { css } from "utils/css";
import styles from "./Divider.module.css";

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

const STOCKY_BROAD = "2px"; 
const STOCKY_TALL = "80%";
const STOCKY_AROUND = "5px";

export const Divider: FC<Props> = ({ dent, direction, isStocky = false }) => {
  const isDentedIn = dent === "in";
  const isHorizontal = direction === "horizontal";

  const style = css(
    styles.Divider,
    isDentedIn ? styles.In : styles.Out,
    isHorizontal ? styles.Horizontal : styles.Vertical,
    isStocky ? styles.Stocky : "",
  );

  const override: CSSProperties = {};

  if (isStocky) {
    if (isHorizontal) {
      override.marginLeft = STOCKY_AROUND;
      override.width = STOCKY_TALL;
      override.height = STOCKY_BROAD;
    } else {
      override.marginTop = STOCKY_AROUND;
      override.height = STOCKY_TALL;
      override.width = STOCKY_BROAD;
    }
  }

  return <aside className={style} style={override} />;
};
