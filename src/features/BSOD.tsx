import { useKernel } from "kernel";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { randomHexQuad } from "utils/randomHexQuad";
import styles from "./BSOD.module.css";

type Props = {};

const ERRNO = randomHexQuad().slice(0, 2).toUpperCase();

const MEMADDR = `0x${randomHexQuad()}`;

export const BSOD: FC<Props> = () => {
  const { bsodError, bsodMessage } = useKernel();

  return (
    <main className={styles.Container}>
      <article className={styles.Layout}>
        <p className={styles.Headline}>
          A fatal exception {ERRNO} has occurred at <strong className={styles.Hex}>{MEMADDR}</strong>: {bsodError}
        </p>
        <p className={styles.Text}>ERROR: "{bsodMessage}"</p>
        <section className={styles.Steps}>
          <p className={styles.Text}>* Press F5 to terminate the current web application.</p>
          <p className={styles.Text}>* Press ALT + F4 to exit the current browser session.</p>
          <p className={styles.Text}>You will lose any unsaved information in this tab.<strong className={styles.Blink}>█</strong></p>
        </section>
      </article>
    </main>
  );
};
