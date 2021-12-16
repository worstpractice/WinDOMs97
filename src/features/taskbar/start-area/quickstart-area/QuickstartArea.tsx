import type { ReactNode } from 'react';
import { default as React } from 'react';
import { Divider } from 'src/components/Divider';
import { css } from 'src/utils/as/css';

type Props = {
  readonly children: ReactNode;
};

export const QuickstartArea = ({ children }: Props) => {
  return (
    <div style={styles.Wrapper}>
      <Divider dent="in" direction="vertical" />
      <Divider direction="vertical" stocky />
      <ul style={styles.QuickstartArea}>{children}</ul>
      <Divider dent="in" direction="vertical" />
      <Divider direction="vertical" stocky />
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  QuickstartArea: css({
    alignItems: 'center',
    display: 'flex',
    gap: '18px',
    justifyContent: 'center',
  } as const),

  Wrapper: css({
    alignItems: 'center',
    display: 'flex',
    gap: '8px',
    height: '100%',
    justifyContent: 'center',
  } as const),
} as const;
