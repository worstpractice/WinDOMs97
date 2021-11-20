import logo from 'assets/icons/windows-0.png';
import { Icon } from 'components/Icon';
import { OsButton } from 'components/OsButton';
import { Title } from 'components/Title';
import { switchOn } from 'event-filters/delegate';
import { useOsRef } from 'hooks/useOsRef';
import { useActiveState } from 'state/useActiveState';
import { useMenuState } from 'state/useMenuState';
import { isRef } from 'type-predicates/isRef';
import type { ButtonHandler } from 'typings/ButtonHandler';
import type { ActiveState } from 'typings/state/ActiveState';
import type { MenuState } from 'typings/state/MenuState';
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
