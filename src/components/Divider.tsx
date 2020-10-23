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

const PX_BROAD = "2px";

const PERCENT_TALL = "80%";

const PX_AROUND = "5px";

export const Divider: FC<Props> = ({ dent, direction, isStocky = false }) => {
  const isDentedIn = dent === "in";
  const isHorizontal = direction === "horizontal";

  const style = css(
    styles.Divider,
    isDentedIn ? styles.In : styles.Out,
    isHorizontal ? styles.Horizontal : styles.Vertical,
  );

  const override: CSSProperties = {};

  if (isStocky) {
    override.outlineStyle = "outset";

    if (isHorizontal) {
      override.marginLeft = PX_AROUND;
      override.width = PERCENT_TALL;
      override.height = PX_BROAD;
    } else {
      override.marginTop = PX_AROUND;
      override.height = PERCENT_TALL;
      override.width = PX_BROAD;
    }
  }

  return <aside className={style} style={override} />;
};
