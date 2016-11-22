import React from "react";
import ReactDOM from "react-dom";

function evalScript(script) {
  const module = { exports: {} };
  eval(script);
  return module.exports;
}

const mod = evalScript(window.katatemaData.componentScript)
const Component = mod.default || mod;
ReactDOM.render(
  <Component/>,
  document.getElementById("container")
);
