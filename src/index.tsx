import 'modern-normalize';
import { default as React, StrictMode } from 'react';
import { render } from 'react-dom';
import { Boot } from 'src/features/Boot';
import { usePressedState } from 'src/state/usePressedState';

// Disable the default context menu globally
window.oncontextmenu = () => false;
document.oncontextmenu = () => false;

const { setIsLmbPressed, setIsRmbPressed } = usePressedState.getState();

window.addEventListener(
  'mousedown',
  ({ button }) => {
    if (button === 0) setIsLmbPressed(true);
    if (button === 2) setIsRmbPressed(true);
  },
  {
    capture: true,
    passive: true,
  },
);

window.addEventListener(
  'mouseup',
  ({ button }) => {
    if (button === 0) setIsLmbPressed(false);
    if (button === 2) setIsRmbPressed(false);
  },
  {
    capture: true,
    passive: true,
  },
);

render(
  <StrictMode>
    <Boot />
  </StrictMode>,
  document.getElementById('root'),
);
