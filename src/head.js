import React from "react";
import ReactDOM from "react-dom";
import HeadManager from "./head-manager";

let idealHeadChildren = [];
const mountedHeads = new Set();
const headManager = new HeadManager();

function updateCurrentHeadChildren() {
  idealHeadChildren = ([...mountedHeads]).map((element) => {
    return element.props.children;
  }).filter((children) => {
    return !!children;
  }).reduce((a, b) => {
    return a.concat(b);
  }, []).map((child) => {
    const className = (child.className ? child.className + " " : "") + "katatema-head"
    return React.cloneElement(child, { className });
  });
  if (typeof window !== "undefined") {
    headManager.updateHead(idealHeadChildren);
  }
}

class Head extends React.Component {
  static rewind() {
    const headerChildren = idealHeadChildren;
    idealHeadChildren = [];
    return headerChildren;
  }

  componentDidUpdate() {
    updateCurrentHeadChildren();
  }

  componentWillMount() {
    mountedHeads.add(this);
    updateCurrentHeadChildren();
  }

  componentWillUnmount() {
    mountedHeads.delete(this);
    updateCurrentHeadChildren();
  }

  render() {
    return null;
  }
}

global.Head = Head;

export default Head
