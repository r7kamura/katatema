import EventEmitter from "events";
import React from "react";
import ReactDOM from "react-dom";
import UpdatableComponent from "../src/updatable-component";

global.modan = { eventEmitter: new EventEmitter() };

function evalScript(script) {
  const module = { exports: {} };
  eval(script);
  return module.exports;
}

const mod = evalScript(window.modanData.componentScript)
const Component = mod.default || mod;
ReactDOM.render(
  <UpdatableComponent Component={Component} eventEmitter={global.modan.eventEmitter}/>,
  document.getElementById("container")
);
