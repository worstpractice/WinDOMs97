import logo from "assets/icons/windows-0.png";
import { Icon } from "components/Icon";
import { Title } from "components/Title";
import { onAnyMB } from "event-filters/onAnyMB";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import type { MouseEventHandler } from "react";
import * as React from "react";
import { isRef } from "type-predicates/isRef";
import type { FC } from "typings/FC";
import { css } from "utils/css";
import styles from "./StartButton.module.css";

type Props = {};

export const StartButton: FC<Props> = () => {
  const { activate, activeRef, toggleStartMenu } = useKernel();
  const startButtonRef = useOsRef<HTMLButtonElement>();

  const handleLMB: MouseEventHandler<HTMLButtonElement> = (e) => {
    // NOTE: Since the Taskbar under us runs `closeMenu` on mousedown, it's vital that we stop this event here -- or the Start menu cannot open.
    e.stopPropagation();
    if (isRef(activeRef, startButtonRef)) {
      activate({ current: null });
      toggleStartMenu();
    } else {
      activate(startButtonRef);
      toggleStartMenu();
    }
  };

  const handleRMB: MouseEventHandler<HTMLButtonElement> = (e) => {
    // NOTE: This is here because we want `StartButton` to support `ContextMenu` clicks.
    e.stopPropagation();
    // TODO: Import `Alternative` and get cracking on context menu options!
  };

  const handleMouseDown = onAnyMB<HTMLButtonElement>({ onLMB: handleLMB, onRMB: handleRMB });

  const style = isRef(activeRef, startButtonRef) ? css(styles.StartButton, styles.Pressed) : styles.StartButton;

  return (
    <button className={style} onMouseDown={handleMouseDown} type="button" ref={startButtonRef}>
      <Icon className={styles.Logo} alt={"Start"} src={logo} />
      <Title of={"Start"} />
    </button>
  );
};
