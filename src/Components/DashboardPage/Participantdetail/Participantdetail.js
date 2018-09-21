import React from "react";
import { db } from "../../../Firebase";
import withAuthorization from "../../WithAuthorization/WithAuthorization";

import "./Participantdetail.css";

class ParticipantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: "",
      phase: ""
    };
  }

  componentDidMount() {
    db.onceGetUser("Atjkv1xw5gZ5wRv9DpLO6zYlwd43").then(snapshot =>
      this.setState({
        username: snapshot.val() && snapshot.val().username,
        email: snapshot.val() && snapshot.val().email,
        phase: snapshot.val() && snapshot.val().phase
      })
    );
  }

  render() {
    console.log("username = ", this.state.username);

    return (
      <div className="ParticipantPage">
        <div>
          <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h2 className="mdl-card__title-text">{this.state.username}</h2>
            </div>
            <div>
              <h4>{this.state.email}</h4>
              <h4>{this.state.phase}</h4>
            </div>
          </div>
        </div>
        <div className="CompanyInfo">
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h2 className="mdl-card__title-text">Company</h2>
            </div>
            <div>
              <h4>Company name</h4>
              <h4>Contactperson</h4>
              <h4>Address</h4>
              <h4>Company name</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(ParticipantDetail);
