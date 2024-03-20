import { default as React, useRef } from 'react';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import type { Loader } from 'src/typings/Loader';
import { css } from 'src/utils/as/css';

type Props = {
  readonly getProcess: Loader;
};

export const Ie = ({ getProcess }: Props) => {
  const programRef = useRef<HTMLIFrameElement>(null);
  const process = getProcess(programRef);
  useActivateOnMount(programRef);
  useStartingDimensions(process);

  const { programName } = process.binaryImage;

  return (
    <iframe
      style={styles.IE}
      frameBorder="0"
      loading="eager"
      // src="http://nineties.website/"
      src="page.html"
      title={programName}
      ref={programRef}
    />
  );
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
const styles = {
  IE: css({
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  } as const),
} as const;
