import React from "react";
import Participant from "../Participant/Participant";
import "./Participantlist.css";

class ParticipantList extends React.Component {
  render() {
    return (
      <div className="Participantlist">
        {this.props.users.map(user => {
          return (
            <Participant
              phaseChance={this.props.phaseChance}
              phases={this.props.phases}
              key={user.emailaddress}
              user={user}
              name={user.name}
              emailaddress={user.emailaddress}
              place={user.place}
              new={user.new}
            />
          );
        })}
      </div>
    );
  }
}

export default ParticipantList;
