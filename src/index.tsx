import 'modern-normalize';
import { default as React, StrictMode } from 'react';
import { render } from 'react-dom';
import { Boot } from 'src/features/Boot';
import 'src/styles/reset.module.css';

// Disable the default context menu globally
window.oncontextmenu = () => {
  return false;
};
document.oncontextmenu = () => {
  return false;
};

render(
  <StrictMode>
    <Boot />
  </StrictMode>,
  document.getElementById('root'),
);
