import { Component } from "react";
import { Navigate } from "react-router-dom";
//...

export default class Profile extends Component<Props, State> {
  ...

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      ...
    );
  }
}