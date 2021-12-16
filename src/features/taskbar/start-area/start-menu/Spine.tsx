import { default as React } from 'react';
import { Title } from 'src/components/Title';
import { css } from 'src/utils/as/css';

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const Spine = ({}: Props) => {
  return (
    <header aria-orientation="vertical" style={styles.Spine}>
      <Title style={styles.Title} of={'WinDOMs 97'} />
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
    pointerEvents: 'none',
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
