import React from "react";
import ReactDOM from "react-dom";

function evalScript(script) {
  const module = { exports: {} };
  eval(script);
  return module.exports;
}

const Component = evalScript(window.modanData.componentScript).default;
ReactDOM.render(
  <Component/>,
  document.getElementById("container")
);
