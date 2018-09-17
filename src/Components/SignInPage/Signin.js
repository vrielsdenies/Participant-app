import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { SignUpLink } from "../SignUpPage/Signup";
import { PasswordForgetLink } from "../PasswordforgetPage/Passwordforget";
import { auth } from "../../Firebase";
import * as routes from "../../Constants/Routes";

//CSS
import "./Signin.css";

// const SignInPage = ({ history }) => (
//   <div className="SignInPage">
//     <h1>Sign In</h1>
//     <SignInForm history={history} />
//     <PasswordForgetLink />
//     <SignUpLink />
//   </div>
// );

const SignInPage = ({ history }) => (
  <div className="SignInPage">
    <div className="demo-card-square mdl-card mdl-shadow--2dp">
      <div className="mdl-card__title mdl-card--expand">
        <h2 className="mdl-card__title-text">Sign In</h2>
      </div>
      <div className="mdl-card__actions">
        <SignInForm history={history} />
      </div>
      <div className="mdl-card__actions mdl-card--border">
        <PasswordForgetLink />
        <SignUpLink />
      </div>
    </div>
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.ACCOUNT);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div className="SignInForm">
        <form onSubmit={this.onSubmit}>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
              type="text"
              placeholder="Emailaddress"
            />
            {/* <label className="mdl-textfield__label">emailaddress</label> */}
          </div>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              value={password}
              onChange={event =>
                this.setState(byPropKey("password", event.target.value))
              }
              type="password"
              placeholder="Password"
            />
            {/* <label className="mdl-textfield__label">Password</label> */}
          </div>
          <button
            disabled={isInvalid}
            type="submit"
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
          >
            Sign In
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
