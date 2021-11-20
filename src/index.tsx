import { Boot } from 'features/Boot';
import 'modern-normalize';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import 'styles/reset.module.css';

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
