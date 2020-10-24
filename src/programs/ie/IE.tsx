import type { FC } from "typings/FC";
import { default as React } from "react";
import style from "./IE.module.css";
import type { Process } from "typings/Process";

type Props = {
  process: Process;
};

export const IE: FC<Props> = ({ process }) => {
  const { name } = process.binaryImage;

  return (
    <iframe
      className={style.IE}
      frameBorder="0"
      loading="eager"
      src="http://nineties.website/"
      title={name}
    />
  );
};
