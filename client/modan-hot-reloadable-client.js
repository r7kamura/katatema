import "react-hot-loader/patch";
import "webpack-dev-server/client?http://localhost:4000";

import React from "react";
import ReactDOM from "react-dom";

function evalScript(script) {
  const module = { exports: {} };
  eval(script);
  return module.exports;
}

const context = { evalScript };

const mod = context.evalScript(window.modanData.componentScript)
const Component = mod.default || mod;
ReactDOM.render(
  <Component/>,
  document.getElementById("container")
);
