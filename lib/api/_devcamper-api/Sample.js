import React, { Component } from "react";
import PropTypes from "prop-types";

class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //  Accepting Default Props through static Class property.
  static defaultProps = {};
  // A function | simply called as a method inside a Class
  fetchFeed() {
    console.log("Display Feed");
  }
  // A function in which we need to manually `bind this keyword` ie.,`.bind(this)`
  matchFeed() {
    console.log("Match the  Feed");
    // we need to bind this method bcz we used this keyword
    // ---- //
    // Are just use the Arrow function
  }
  render() {
    //   Destructring of required Props and State elements.
    const {} = this.state;
    const {} = this.props;
    // Declaring a Variable ..
    let age = 18;
    return (
      <div>
        <React.Fragment>
          <h3>Component For Reference</h3>
        </React.Fragment>
      </div>
    );
  }
}

// Default Props which are accepted by the Component
Sample.defaultProps = {};
// Validating the type of a Props
Sample.propTypes = {
  title: PropTypes.func.isRequired
};
export default Sample;
