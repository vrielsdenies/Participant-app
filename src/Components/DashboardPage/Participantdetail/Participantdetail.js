import React from "react";
//import { auth } from "../../../Firebase";

import "./Participantdetail.css";

class ParticipantDetail extends React.Component {
  componentDidMount() {
    var admin = require("firebase-admin");
    console.log("email: " + this.props.match.params.participant_emailaddress);

    admin
      .auth()
      .getUserByEmail(this.props.match.params.participant_emailaddress)
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully fetched user data:", userRecord.toJSON());
      })
      .catch(function(error) {
        console.log("Error fetching user data:", error);
      });
  }

  render() {
    return (
      <div>
        {/* <h1>{this.props.participants.firstname}</h1> */}
        <h3>{this.props.match.params.participant_emailaddress}</h3>
      </div>
    );
  }
}

export default ParticipantDetail;
