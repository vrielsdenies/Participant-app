import React, { Component } from "react";

import { auth } from "../../Firebase";
import "./PasswordchangeForm.css";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <div className="PasswordChangeForm">
        <div className="demo-card-square mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title mdl-card--expand">
            <h2 className="mdl-card__title-text">Change your password</h2>
          </div>
          <div className="mdl-card__actions">
            <form onSubmit={this.onSubmit}>
              <div className="mdl-textfield mdl-js-textfield">
                <input
                  className="mdl-textfield__input"
                  value={passwordOne}
                  onChange={event =>
                    this.setState(byPropKey("passwordOne", event.target.value))
                  }
                  type="password"
                  placeholder="New password"
                />
                {/* <label className="mdl-textfield__label">New password</label> */}
              </div>
              <div className="mdl-textfield mdl-js-textfield">
                <input
                  className="mdl-textfield__input"
                  value={passwordTwo}
                  onChange={event =>
                    this.setState(byPropKey("passwordTwo", event.target.value))
                  }
                  type="password"
                  placeholder="Confirm new password"
                />
                {/* <label className="mdl-textfield__label">
                  Confirm new password
                </label> */}
              </div>
              <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
                disabled={isInvalid}
                type="submit"
              >
                Reset My Password
              </button>

              {error && <p>{error.message}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordChangeForm;
