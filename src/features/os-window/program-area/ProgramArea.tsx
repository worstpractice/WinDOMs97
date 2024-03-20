import type { ReactNode } from 'react';
import { default as React } from 'react';
import { css } from 'src/utils/as/css';

type Props = {
  readonly children: ReactNode;
};

export const ProgramArea = ({ children }: Props) => {
  return <main style={styles.ProgramArea}>{children}</main>;
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
const styles = {
  ProgramArea: css({
    backgroundColor: 'var(--oswindow-background)',
    cursor: 'auto',
    height: '100%',
    outlineColor: 'var(--oswindow-outline)',
    outlineStyle: 'inset',
    outlineWidth: '4px',
    padding: '4px',
    width: '100%',
  } as const),
} as const;
