import React from "react";
import { db } from "../../../Firebase";
import withAuthorization from "../../WithAuthorization/WithAuthorization";

import "./Participantdetail.css";

class ParticipantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    //console.log("authuser = ", authUser);

    db.onceGetUser("Atjkv1xw5gZ5wRv9DpLO6zYlwd43").then(snapshot =>
      this.setState({ user: snapshot.val() })
    );
  }

  render() {
    console.log("user = ", this.state.user);
    return (
      <div className="ParticipantPage">
        <div>
          <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h2 className="mdl-card__title-text">Participant</h2>
            </div>
            <div>
              <h3>Username</h3>
              <h3>Emailaddress</h3>
            </div>
          </div>
        </div>
        <div className="CompanyInfo">
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h2 className="mdl-card__title-text">Company</h2>
            </div>
            <div>
              <h3>Company name</h3>
              <h3>Contactperson</h3>
              <h3>Address</h3>
              <h3>Company name</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(ParticipantDetail);
