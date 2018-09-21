import React from "react";

import AuthUserContext from "../AuthUserContext/AuthUserContext";
import PasswordChangeForm from "../PasswordchangeForm/Passwordchangeform";
import withAuthorization from "../WithAuthorization/WithAuthorization";
import { firebase, auth, db } from "../../Firebase/";

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

var user = firebase.auth.currentUser;
var uid;

if (user != null) {
  uid = user.uid;
}

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phase: ""
    };
  }

  componentDidMount() {
    db.onceGetUser(uid).then(snapshot =>
      this.setState({
        username: snapshot.val() && snapshot.val().username,
        email: snapshot.val() && snapshot.val().email,
        phase: snapshot.val() && snapshot.val().phase
      })
    );
  }

  render() {
    console.log("uid", uid);
    console.log("name", this.state.username);

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
                  <h4>Email: {authUser && authUser.email}</h4>
                  <h4>Username: {this.state.name}</h4>
                  <h4>Phase: {this.state.phase}</h4>
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

// const AccountPageInfo = () => (
// <div>
//
// </div>
// );

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);

//export default AccountPage;
