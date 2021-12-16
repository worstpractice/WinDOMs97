import type { CSSProperties } from 'react';
import { default as React, useRef } from 'react';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import type { Loader } from 'src/typings/Loader';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles: { readonly [key in string]: CSSProperties } = new Proxy(
  {},
  {
    get() {
      return {};
    },
  },
);
// import styles from './BSOD.module.css';

type Props = {
  readonly getProcess: Loader;
};

export const Ie = ({ getProcess }: Props) => {
  const ieRef = useRef<HTMLIFrameElement>(null);
  const process = getProcess(ieRef);
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
      ref={ieRef}
    />
  );
};
