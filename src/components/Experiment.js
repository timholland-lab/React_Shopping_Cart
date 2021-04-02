// simple button for toggling the css on a given element, in this case just a div
// JSX is very convenient, you just insert the ternary right there in the tag
// two options - either with inline css or just the class

import React, { Component } from "react";
import './css/Experiment.css'

export class Experiment extends Component {
  state = {
    toggle: false
  };

  flipFunction = () => {
    this.setState({ toggle: !this.state.toggle });

  }

  render() {
    const { toggle } = this.state;
    return (
      <>
        <div className={toggle ? "myClass" : "myClass2"}>Experiment</div>
        <div style={toggle ? { color: "orange" } : { color: "blue" }}> Experiment </div>

        <button onClick={this.flipFunction}>Click Me</button>
      </>
    );
  }
}
