import React from "react";

export default class UpdatableComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { Component: this.props.Component };
  }

  componentDidMount() {
    this.props.eventEmitter.on("update", (state) => {
      this.setState(state);
    });
  }

  render() {
    const Component = this.state.Component;
    return <Component/>;
  }
}
