import "normalize.css";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import { OS } from "features/OS";
import "styles/reset.module.css";

// Disable the default context menu globally
window.oncontextmenu = () => false;
document.oncontextmenu = () => false;

render(
  <StrictMode>
    <OS />
  </StrictMode>,
  document.getElementById("root"),
);
