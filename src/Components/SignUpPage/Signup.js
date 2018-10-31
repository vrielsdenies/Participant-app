import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth, db } from "../../Firebase/";
//import Select from "react-select";

import * as routes from "../../Constants/Routes";
import "./Signup.css";

const SignUpPage = ({ history }) => (
  // <div>
  //   <h1>SignUp</h1>
  //   <SignUpForm history={history} />
  // </div>

  <div className="SignInPage">
    <div className="demo-card-square mdl-card mdl-shadow--2dp">
      <div className="mdl-card__title mdl-card--expand">
        <h2 className="mdl-card__title-text">Sign Up</h2>
      </div>
      <div className="mdl-card__actions">
        <SignUpForm history={history} />
      </div>
    </div>
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  phase: "Nieuw",
  company: "",
  value: "",
  companies: []
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, phase, company } = this.state;

    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne, phase)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email, phase, company)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            history.push(routes.ACCOUNT);
          })
          .catch(error => {
            this.setState(byPropKey("error", error));
          });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  componentDidMount() {
    db.onceGetCompanies().then(snapshot =>
      this.setState({ companies: snapshot.val() })
    );
  }

  render() {
    console.log("company = ", this.state.company);

    const companyList = Object.values(this.state.companies).map(company => {
      // return { value: company.name, label: company.name };
      return company.name;
    });

    console.log("companyList = ", companyList);

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      company,
      error,
      value
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "" ||
      company === "";

    return (
      <div className="SignUpForm">
        <form onSubmit={this.onSubmit}>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              value={username}
              onChange={event =>
                this.setState(byPropKey("username", event.target.value))
              }
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              value={passwordOne}
              onChange={event =>
                this.setState(byPropKey("passwordOne", event.target.value))
              }
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              value={passwordTwo}
              onChange={event =>
                this.setState(byPropKey("passwordTwo", event.target.value))
              }
              type="password"
              placeholder="Confirm password"
            />
          </div>

          <select
            className="mdl-textfield mdl-js-textfield getmdl-select"
            //value={this.state.company}
            value={company}
            onChange={event =>
              this.setState(byPropKey("company", event.target.value))
            }
          >
            <option value={value} disabled>
              Select your organisation
            </option>
            {companyList.map(company => {
              return (
                <option
                  className="mdl-menu__item"
                  value={company}
                  key={company}
                >
                  {company}
                </option>
              );
            })}
          </select>

          <br />
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
            disabled={isInvalid}
            type="submit"
          >
            Sign Up
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
