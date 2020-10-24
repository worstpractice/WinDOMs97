import { useStartingDimensions } from "hooks/programs/useStartingDimensions";
import { useOsRef } from "hooks/useOsRef";
import { default as React, memo } from "react";
import type { FC } from "typings/FC";
import type { Loader } from "typings/Loader";
import style from "./IE.module.css";

type Props = {
  getProcess: Loader;
};

const IE: FC<Props> = ({ getProcess }) => {
  const programRef = useOsRef<HTMLIFrameElement>();
  const process = getProcess(programRef);
  useStartingDimensions(process);

  const { name } = process.binaryImage;

  return (
    <iframe
      className={style.IE}
      frameBorder="0"
      loading="eager"
      // src="http://nineties.website/"
      src="page.html"
      title={name}
      ref={programRef}
    />
  );
};

const memoized = memo<Props>(IE);

export { memoized as IE };
