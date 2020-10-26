import { Explorer } from "features/Explorer";
import "normalize.css";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import "styles/reset.module.css";

// Disable the default context menu globally
window.oncontextmenu = () => false;
document.oncontextmenu = () => false;

render(
  <StrictMode>
    <Explorer />
  </StrictMode>,
  document.getElementById("root"),
);
