// The higher order component fulfils only one purpose. It shields away the business
//logic from the App component. Thus the App component stays lightweight.
//There is no business logic mixed up in the component anymore.
//Higher order components are a great concept in React to extract logic from components,
//but you can use them later on to enhance components with it.
//Therefore, they are a great way to accomplish reusability, composability and often maintainability in React.
//
// React’s context API is a React concept which helps us to pass around properties in our application.
//Rather than passing props explicitly down to all components who are interested in them, you can pass
//these props implicitly down to these components without bothering the components in between of the hierarchy.
//Thus, in our case, the App component doesn’t need to bother about the authenticated user object anymore,
//because it only passes it down to various other components.

import React from "react";
import AuthUserContext from "../AuthUserContext/AuthUserContext";
import { firebase } from "../../Firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
    }

    render() {
      const { authUser } = this.state;
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
};

export default withAuthentication;
