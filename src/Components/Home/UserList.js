import React from "react";
import ParticipantFB from "./ParticipantFB";

class UserList extends React.Component {
  render() {
    // const usersFiltered = this.props.users;

    return (
      <div className="Participantlist">
        {this.props.users.map(user => {
          return (
            <ParticipantFB
              phaseChance={this.props.phaseChance}
              phases={this.props.phases}
              key={user.email}
              users={this.props.user}
              username={user.username}
              email={user.email}
              uid={user.uid}
              phase={user.phase}
              company={user.company}
            />
          );
        })}
      </div>
    );
  }
}

export default UserList;
