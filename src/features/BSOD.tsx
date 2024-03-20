import { default as React } from 'react';
import { useErrorState } from 'src/state/useErrorState';
import type { ErrorState } from 'src/typings/state/ErrorState';
import { css } from 'src/utils/as/css';
import { randomHexQuad } from 'src/utils/randomHexQuad';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromError = from<ErrorState>().select('bsodError', 'bsodMessage');
////////////////////////////////////////////////////////////////

const ERRNO = randomHexQuad().slice(0, 2).toUpperCase();

const MEMADDR = `0x${randomHexQuad()}`;

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const Bsod = ({}: Props) => {
  const { bsodError, bsodMessage } = useErrorState(fromError);

  return (
    <main style={styles.Bsod}>
      <article style={styles.Layout}>
        <p style={styles.Headline}>
          A fatal exception {ERRNO} has occurred at <strong style={styles.Hex}>{MEMADDR}</strong>: {bsodError}
        </p>
        <p style={styles.Text}>ERROR: "{bsodMessage}"</p>
        <section style={styles.Steps}>
          <p style={styles.Text}>* Press F5 to restart the current web application.</p>
          <p style={styles.Text}>* Press ALT + F4 to terminate the current browser session.</p>
        </section>
        <p style={styles.Text}>
          You will lose any unsaved information in this tab.<strong style={styles.Blink}>█</strong>
        </p>
      </article>
    </main>
  );
};

////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////
const styles = {
  Blink: css({
    animation: 'blinkingText 1.2s infinite',
    fontFamily: "'Perfect DOS VGA 437 Win', Arial, Helvetica, sans-serif",
    fontSize: '18px',
  } as const),

  Bsod: css({
    alignItems: 'center',
    backgroundColor: 'var(--bsod-background)',
    bottom: '0',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    left: '0',
    position: 'absolute',
    right: '0',
    top: '0',
    width: '100vw',
    zIndex: '1337',
  } as const),

  Headline: css({
    boxSizing: 'border-box',
    color: 'var(--gray)',
    fontFamily: "'Perfect DOS VGA 437 Win', Arial, Helvetica, sans-serif",
    fontSize: '18px',
    lineHeight: '100px',
  } as const),

  Hex: css({
    color: 'var(--yellow)',
    fontFamily: "'Perfect DOS VGA 437 Win', Arial, Helvetica, sans-serif",
    fontSize: '18px',
  } as const),

  Layout: css({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  } as const),

  Steps: css({
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
  } as const),

  Text: css({
    boxSizing: 'border-box',
    color: 'var(--gray)',
    fontFamily: "'Perfect DOS VGA 437 Win', Arial, Helvetica, sans-serif",
    fontSize: '18px',
    lineHeight: '100px',
  } as const),
} as const;
