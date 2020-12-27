import { Boot } from "features/Boot";
import "normalize.css";
import { StrictMode } from "react";
import { render } from "react-dom";
import "styles/reset.module.css";

// Disable the default context menu globally
window.oncontextmenu = () => false;
document.oncontextmenu = () => false;

render(
  <StrictMode>
    <Boot />
  </StrictMode>,
  document.getElementById("root"),
);
