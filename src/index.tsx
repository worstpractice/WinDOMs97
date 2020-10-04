import "normalize.css";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import "styles/reset.module.css";
import { App } from "./components/App";

// Disable the default context menu globally
document.oncontextmenu = () => false;

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
);
