import { default as React, useEffect, useRef, useState } from 'react';
import { useStartingDimensions } from 'src/hooks/programs/useStartingDimensions';
import { useActivateOnMount } from 'src/hooks/useActivateOnMount';
import { useKeyboardState } from 'src/state/useKeyboardState';
import { INTERACTIVE } from 'src/styles/INTERACTIVE';
import type { Loader } from 'src/typings/Loader';
import type { KeyboardState } from 'src/typings/state/KeyboardState';
import { css } from 'src/utils/as/css';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKeyboard = from<KeyboardState>().select('lastKeyPress');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly getProcess: Loader;
};

export const Notepad = ({ getProcess }: Props) => {
  const programRef = useRef<HTMLDivElement>(null);
  const process = getProcess(programRef);
  useActivateOnMount(programRef);
  useStartingDimensions(process);
  const { lastKeyPress } = useKeyboardState(fromKeyboard);
  const [presses, setPresses] = useState(lastKeyPress.order);
  const [text, setText] = useState('');

  useEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      const { button, character, order } = lastKeyPress;

      if (order === presses) return;

      setPresses(() => order);
      setText((prev) => {
        // prettier-ignore
        return button === 'Backspace'
          ? prev.slice(0, -1)
          : prev + character;
      });
    };

    effect();

    return () => {
      isCancelled = true;
    };
  }, [lastKeyPress, presses]);

  console.log(text);

  return (
    <div style={styles.Notepad} ref={programRef}>
      {text}
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  Notepad: css({
    backgroundColor: 'white',
    color: 'black',
    cursor: 'text',
    height: '100%',
    text: 'black',
    width: '100%',
    ...INTERACTIVE,
  } as const),
} as const;
