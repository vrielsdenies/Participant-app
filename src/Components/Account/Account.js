import React from "react";

import AuthUserContext from "../AuthUserContext/AuthUserContext";
import PasswordChangeForm from "../PasswordchangeForm/Passwordchangeform";
import withAuthorization from "../WithAuthorization/WithAuthorization";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser && authUser.email}</h1>
        {/* in async situations
        react renders twice, one with initial values and then again with the
        retrieved values. so you have to do some check like `authUser &&
        authUser.email` */}
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);

//export default AccountPage;
