import { Title } from "components/Title";
import { Words } from "components/Words";
import { default as React } from "react";
import type { FC } from "typings/FC";
import styles from "./Spine.module.css";

type Props = {};

export const Spine: FC<Props> = () => {
  return (
    <header aria-orientation="vertical" className={styles.Spine}>
      <Title className={styles.Title} of={"FakeOS 97"} />
    </header>
  );
};
