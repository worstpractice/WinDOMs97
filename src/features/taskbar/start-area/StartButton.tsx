import logo from "assets/icons/windows-0.png";
import { Icon } from "components/Icon";
import { Title } from "components/Title";
import { switchOn } from "event-filters/delegate";
import { useOsRef } from "hooks/useOsRef";
import { useKernel } from "kernel";
import { default as React } from "react";
import { isRef } from "type-predicates/isRef";
import type { ButtonHandler } from "typings/ButtonHandler";
import type { FC } from "typings/FC";
import { css } from "utils/css";
import styles from "./StartButton.module.css";

type Props = {};

export const StartButton: FC<Props> = () => {
  const { activate, activeRef, toggleStartMenu } = useKernel();
  const startButtonRef = useOsRef<HTMLButtonElement>();

  const handleLMB: ButtonHandler = (e) => {
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

  const handleRMB: ButtonHandler = (e) => {
    // NOTE: This is here because we want `StartButton` to support `ContextMenu` clicks.
    e.stopPropagation();
    // TODO: Import `Alternative` and get cracking on context menu options!
  };

  const style = isRef(activeRef, startButtonRef) ? css(styles.StartButton, styles.Pressed) : styles.StartButton;

  return (
    <button
      className={style}
      onMouseDown={switchOn({ LMB: handleLMB, RMB: handleRMB })}
      type="button"
      ref={startButtonRef}
    >
      <Icon className={styles.Logo} alt={"Start"} src={logo} />
      <Title className={styles.Title} of={"Start"} />
    </button>
  );
};
