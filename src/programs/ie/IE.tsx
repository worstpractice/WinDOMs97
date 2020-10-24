import { default as React, memo } from "react";
import type { FC } from "typings/FC";
import type { Process } from "typings/Process";
import style from "./IE.module.css";

type Props = {
  process: Process;
};

const IE: FC<Props> = ({ process }) => {
  const { name } = process.binaryImage;

  return (
    <iframe
      className={style.IE}
      frameBorder="0"
      loading="eager"
      // src="http://nineties.website/"
      src="page.html"
      title={name}
    />
  );
};

const memoized = memo<Props>(IE);

export { memoized as IE };
