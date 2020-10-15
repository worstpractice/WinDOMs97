import type { FC } from "react";
import * as React from "react";
import type { Process } from "typings/Process";
import style from "./IE.module.css";

type Props = {
  process: Process;
};

export const IE: FC<Props> = ({ process }) => {
  const { name } = process;

  return (
    <iframe
      className={style.IE}
      frameBorder="0"
      loading="lazy"
      src="page.html"
      style={{ height: "100%", width: "100%" }}
      title={name}
    />
  );
};
