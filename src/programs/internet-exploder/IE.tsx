import type { FC } from "typings/FC";
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
      loading="eager"
      src="page.html"
      title={name}
    />
  );
};
