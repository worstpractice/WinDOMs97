import type { CSSProperties } from "react";
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

/** Maps visually to breadth. Set via height or width depending on direction (horizontal or vertical). */
const STOCKY_BREADTH = "2px";

/** Maps visually to length. Set via height or width depending on direction (horizontal or vertical). */
const STOCKY_LENGTH = "80%";

/** Maps visually to free space surrounding the divider. Set via paddingTop or paddingLeft depending on direction (horizontal or vertical). */
const STOCKY_FREE_SPACE = "5px";

export const Divider: FC<Props> = ({ dent, direction, isStocky = false }) => {
  const isDentedIn = dent === "in";
  const isHorizontal = direction === "horizontal";

  const style = css(
    styles.Divider ?? "",
    (isDentedIn ? styles.In : styles.Out) ?? "",
    (isHorizontal ? styles.Horizontal : styles.Vertical) ?? "",
    (isStocky ? styles.Stocky : "") ?? "",
  );

  const override: CSSProperties = {};

  if (isStocky) {
    if (isHorizontal) {
      override.paddingLeft = STOCKY_FREE_SPACE;
      override.width = STOCKY_LENGTH;
      override.height = STOCKY_BREADTH;
    } else {
      override.paddingTop = STOCKY_FREE_SPACE;
      override.height = STOCKY_LENGTH;
      override.width = STOCKY_BREADTH;
    }
  }

  return <aside className={style} style={override} />;
};
