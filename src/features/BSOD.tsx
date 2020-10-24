import { useKernel } from "kernel";
import { default as React } from "react";
import type { FC } from "typings/FC";
import styles from "./BSOD.module.css";

type Props = {};

export const BSOD: FC<Props> = () => {
  const { bsodReason } = useKernel();

  return (
    <main className={styles.Container}>
      <article className={styles.Layout}>
        <p className={styles.Text}>
          A fatal exception 0E has occurred at <strong className={styles.Hex}>0x74616e6961</strong>: {bsodReason}
        </p>
        <p className={styles.Text}>* Click any link to terminate the current application.</p>
        <p className={styles.Text}>* Press ALT + F4 again to restart your browser.</p>
        <p className={styles.Text}>You will lose any unsaved information in all tabs.</p>
        <p className={styles.Text}>
          Click any link to continue<strong className={styles.Blink}>█</strong>
        </p>
      </article>
    </main>
  );
};
