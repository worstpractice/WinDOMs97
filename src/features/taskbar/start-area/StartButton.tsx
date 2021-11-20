import logo from 'assets/icons/windows-0.png';
import { default as React } from 'react';
import { Icon } from 'src/components/Icon';
import { OsButton } from 'src/components/OsButton';
import { Title } from 'src/components/Title';
import { switchOn } from 'src/event-filters/delegate';
import { useOsRef } from 'src/hooks/useOsRef';
import { useActiveState } from 'src/state/useActiveState';
import { useMenuState } from 'src/state/useMenuState';
import { isRef } from 'src/type-predicates/isRef';
import type { ButtonHandler } from 'src/typings/ButtonHandler';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { MenuState } from 'src/typings/state/MenuState';
import styles from './StartButton.module.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activeRef, setActiveRef, unsetActiveRef }: ActiveState) => {
  return {
    activeRef,
    setActiveRef,
    unsetActiveRef,
  };
};

const fromMenu = ({ toggleStartMenu }: MenuState) => {
  return {
    toggleStartMenu,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const StartButton = ({}: Props) => {
  const { activeRef, setActiveRef, unsetActiveRef } = useActiveState(fromActive);
  const { toggleStartMenu } = useMenuState(fromMenu);
  const startButtonRef = useOsRef<HTMLButtonElement>();

  const handleLMB: ButtonHandler = (e) => {
    // NOTE: Since the Taskbar under us runs `closeMenu` on mousedown, it's vital that we stop this event here -- or the Start menu cannot open.
    e.stopPropagation();

    if (isRef(activeRef, startButtonRef)) {
      unsetActiveRef();
      toggleStartMenu();
    } else {
      setActiveRef(startButtonRef);
      toggleStartMenu();
    }
  };

  const handleRMB: ButtonHandler = (e) => {
    // NOTE: This is here because we want `StartButton` to support `ContextMenu` clicks.
    e.stopPropagation();
    // TODO: Import `Alternative` and get cracking on context menu options!
  };

  return (
    <OsButton className={styles.ButtonOverride} onMouseDown={switchOn({ LMB: handleLMB, RMB: handleRMB })} ref={startButtonRef}>
      <Icon alt={'Start'} height={38} src={logo} width={38} />
      <Title of={'Start'} style={{ fontSize: 28, paddingTop: 4 }} />
    </OsButton>
  );
};
