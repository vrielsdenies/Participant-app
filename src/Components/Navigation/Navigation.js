import React from "react";
import { Link } from "react-router-dom";
import AuthUserContext from "../AuthUserContext/AuthUserContext";
import SignOutButton from "../SignOut/SignOut";

import * as routes from "../../Constants/Routes";
import "./Navigation.css";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

//Navation for logged in users
const NavigationAuth = () => (
  <div className="Navigation">
    <ul>
      <li>
        <Link to={routes.HOME}>Home</Link>
      </li>
      <li>
        <Link to={routes.DASHBOARD}>Dashboard</Link>
      </li>
      <li>
        <Link to={routes.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={routes.COMPANIES}>Companies</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
);

//Navigation for logged out users
const NavigationNonAuth = () => (
  <ul className="Navigation">
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>

    <li>
      <Link to={routes.SIGN_UP}>Sign-up</Link>
    </li>
    <li>
      <Link to={routes.SIGN_IN}>Sign-in</Link>
    </li>
  </ul>
);

export default Navigation;
