import React, { Component } from "react";
import StoreContext from "../context/storeContext";

class Bugs extends Component {
  static contextType = StoreContext;

  componentDidMount() {
    console.log(this.context);
  }
  render() {
    return <div>Bug</div>;
  }
}

export default Bugs;
