import { default as React } from 'react';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useOsRef } from 'src/hooks/useOsRef';
import type { Loader } from 'src/typings/Loader';
import style from './IE.module.css';

type Props = {
  getProcess: Loader;
};

export const IE = ({ getProcess }: Props) => {
  const ieRef = useOsRef<HTMLIFrameElement>();
  const process = getProcess(ieRef);
  useStartingDimensions(process);

  const { programName } = process.binaryImage;

  return (
    <iframe
      className={style.IE}
      frameBorder="0"
      loading="eager"
      // src="http://nineties.website/"
      src="page.html"
      title={programName}
      ref={ieRef}
    />
  );
};
