import { default as React } from 'react';
import { css } from 'src/utils/as/css';

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const Spine = ({}: Props) => {
  return (
    <header aria-orientation="vertical" style={styles.Spine}>
      <p style={styles.Title}>WinDOMs 97</p>
    </header>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Spine: css({
    alignItems: 'flex-end',
    background: 'linear-gradient(0deg, var(--startmenu-spine-bright) 55%, var(--startmenu-spine-dim) 90%, var(--startmenu-spine-bright) 100%)',
    display: 'flex',
    flexShrink: '0',
    transform: 'rotate(180deg)',
    width: '80px',
  } as const),

  Title: css({
    color: 'var(--white)',
    fontSize: '64px',
    minHeight: '90%',
    writingMode: 'vertical-lr',
  } as const),
} as const;
