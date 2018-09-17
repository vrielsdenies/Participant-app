import React from "react";

import { auth } from "../../Firebase";

const SignOutButton = () => (
  <button
    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>
);

export default SignOutButton;
