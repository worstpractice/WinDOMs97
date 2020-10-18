import "normalize.css";
import { OS } from "components/OS";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import "styles/reset.module.css";
import "utils/FlatQueue";

// Disable the default context menu globally
document.oncontextmenu = () => false;

render(
  <StrictMode>
    <OS />
  </StrictMode>,
  document.getElementById("root"),
);
