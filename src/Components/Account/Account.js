import React from "react";

import AuthUserContext from "../AuthUserContext/AuthUserContext";
import PasswordChangeForm from "../PasswordchangeForm/Passwordchangeform";
import withAuthorization from "../WithAuthorization/WithAuthorization";
import { auth, db } from "../../Firebase/";

import "./Account.css";

// const AccountPage = () => (
//   <AuthUserContext.Consumer>
//     {authUser => (
//       <div>
//         <h1>Account: {authUser && authUser.email}</h1>
//         {/* in async situations
//         react renders twice, one with initial values and then again with the
//         retrieved values. so you have to do some check like `authUser &&
//         authUser.email` */}
//         <PasswordChangeForm />
//       </div>
//     )}
//   </AuthUserContext.Consumer>
// );

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      uid: ""
    };
  }

  componentDidMount() {
    //var userId = db.ref().child(`users/${"KvlDMDOU3YTd25zeHOGllSyQKCo2"}`);
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="Account">
            <div className="Personal">
              <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title mdl-card--expand">
                  <h2 className="mdl-card__title-text">Account</h2>
                </div>
                <div>
                  <h3>Email: {authUser && authUser.email}</h3>
                  <h3>Username: {authUser && authUser.displayName}</h3>
                </div>
              </div>
            </div>
            {/* in async situations
            react renders twice, one with initial values and then again with the
            retrieved values. so you have to do some check like `authUser &&
            authUser.email` */}
            <div className="PassWordChangeForm">
              <PasswordChangeForm />
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);

//export default AccountPage;
