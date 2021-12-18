import logo from 'assets/icons/windows-0.png';
import { default as React, useRef } from 'react';
import { Icon } from 'src/components/Icon';
import { OsButton } from 'src/components/OsButton';
import { switchOn } from 'src/event-filters/switchOn';
import { useActiveState } from 'src/state/useActiveState';
import { useMenuState } from 'src/state/useMenuState';
import { usePressedState } from 'src/state/usePressedState';
import { INTERACTIVE } from 'src/styles/INTERACTIVE';
import { isRef } from 'src/type-predicates/isRef';
import type { ButtonHandler } from 'src/typings/ButtonHandler';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { MenuState } from 'src/typings/state/MenuState';
import type { PressedState } from 'src/typings/state/PressedState';
import { css } from 'src/utils/as/css';
import { snitchTo } from 'src/utils/snitchTo';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('activeRef', 'setActiveRef', 'unsetActiveRef');
const fromMenu = from<MenuState>().select('openMenu', 'toggleStartMenu');
const fromPressed = from<PressedState>().select('isLmbPressed');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]-?: never;
};

const snitch = snitchTo(console.log);

export const StartButton = ({}: Props) => {
  const { activeRef, setActiveRef, unsetActiveRef } = useActiveState(fromActive);
  const { openMenu, toggleStartMenu } = useMenuState(fromMenu);
  const { isLmbPressed } = usePressedState(fromPressed);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  const handleLmb: ButtonHandler = (event) => {
    // NOTE: Since the `Taskbar` under us runs `closeMenu` on mousedown, it's vital that we stop this event here -- or the Start menu cannot open.
    event.stopPropagation();

    // prettier-ignore
    isRef(activeRef, startButtonRef)
      ? unsetActiveRef()
      : setActiveRef(startButtonRef);

    toggleStartMenu();
  };

  const handleRmb: ButtonHandler = (event) => {
    // NOTE: This is here because we want `StartButton` to support `ContextMenu` clicks.
    event.stopPropagation();
    // TODO: Import `Alternative` and get cracking on context menu options!
  };

  return (
    <OsButton
      //
      // onMouseDown={switchOn({ lmb: handleLmb, rmb: handleRmb })}
      onMouseDown={snitch(switchOn({ lmb: handleLmb, rmb: handleRmb }))}
      // depress={openMenu === 'StartMenu'}
      ref={startButtonRef}
      style={{
        ...styles.StartButton,
        outlineStyle: openMenu === 'StartMenu' ? 'outset' : 'inset',
      }}
    >
      <Icon alt={'Start'} height={38} src={logo} width={38} />
      <p style={styles.Title}>Start</p>
    </OsButton>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  StartButton: css({
    alignContent: 'center',
    cursor: 'pointer',
    display: 'flex',
    gap: '2px',
    height: '100%',
    justifyContent: 'center',
    width: '100px',
    ...INTERACTIVE,
  } as const),

  Title: css({
    fontSize: 28,
    paddingTop: 4,
  } as const),
} as const;
