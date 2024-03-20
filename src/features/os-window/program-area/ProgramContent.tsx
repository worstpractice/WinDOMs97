import type { ReactNode } from 'react';
import { default as React } from 'react';
import { css } from 'src/utils/as/css';

type Props = {
  readonly children: ReactNode;
};

export const ProgramContent = ({ children }: Props) => {
  return <section style={styles.ProgramContent}>{children}</section>;
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
const styles = {
  ProgramContent: css({
    backgroundColor: 'var(--programcontent-background)',
    height: '100%',
    outlineColor: 'var(--gray-bright)',
    outlineStyle: 'outset',
    outlineWidth: '2px',
    width: '100%',
  } as const),
} as const;
