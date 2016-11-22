import React from "react";

let idealHeadChildren;
const mountedHeads = new Set();

function updateCurrentHeadChildren() {
  idealHeadChildren = ([...mountedHeads]).map((element) => {
    return element.props.children;
  }).filter((children) => {
    return !!children;
  }).reduce((a, b) => {
    return a.concat(b);
  }, []).map((child) => {
    return React.cloneElement(child);
  });
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

if (!global.Head) {
  global.Head = Head;
}

export default Head
