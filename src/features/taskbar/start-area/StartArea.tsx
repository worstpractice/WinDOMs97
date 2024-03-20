import type { ReactNode } from 'react';
import { default as React } from 'react';
import { css } from 'src/utils/as/css';

type Props = {
  readonly children: ReactNode;
};

export const StartArea = ({ children }: Props) => {
  return <section style={styles.StartArea}>{children}</section>;
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
const styles = {
  StartArea: css({
    alignItems: 'center',
    display: 'flex',
    gap: '12px',
    height: '100%',
    justifyContent: 'center',
  } as const),
} as const;
