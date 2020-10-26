import { useKernel } from "kernel/useKernel";
import { default as React } from "react";
import type { FC } from "typings/FC";
import type { OS } from "typings/kernel/OS";
import { randomHexQuad } from "utils/randomHexQuad";
import styles from "./Bsod.module.css";

const selector = ({ bsodError, bsodMessage }: OS) => ({
  bsodError,
  bsodMessage,
});

const ERRNO = randomHexQuad().slice(0, 2).toUpperCase();

const MEMADDR = `0x${randomHexQuad()}`;

type Props = {};

export const Bsod: FC<Props> = () => {
  const { bsodError, bsodMessage } = useKernel(selector);

  return (
    <main className={styles.Bsod}>
      <article className={styles.Layout}>
        <p className={styles.Headline}>
          A fatal exception {ERRNO} has occurred at <strong className={styles.Hex}>{MEMADDR}</strong>: {bsodError}
        </p>
        <p className={styles.Text}>ERROR: "{bsodMessage}"</p>
        <section className={styles.Steps}>
          <p className={styles.Text}>* Press F5 to restart the current web application.</p>
          <p className={styles.Text}>* Press ALT + F4 to terminate the current browser session.</p>
        </section>
        <p className={styles.Text}>
          You will lose any unsaved information in this tab.<strong className={styles.Blink}>█</strong>
        </p>
      </article>
    </main>
  );
};
