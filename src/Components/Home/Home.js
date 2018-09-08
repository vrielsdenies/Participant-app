import React, { Component } from "react";
import UserList from "./UserList";
import Typography from "@material-ui/core/Typography";

import withAuthorization from "../WithAuthorization/WithAuthorization";
import { db } from "../../Firebase";

import "./Home.css";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      phases: ["Nieuw", "Wachten", "Nog niet actief", "Actief", "Klaar"]
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  render() {
    const { users } = this.state;
    console.log("users:", this.state.users);

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <div className="Pipeline-Columns">
          {this.state.phases.map(phaseName => {
            return (
              <div className="Pipeline-Column" key={phaseName}>
                <div className="Column-Header">
                  <Typography paragraph variant="title">
                    {phaseName}
                  </Typography>
                </div>

                {/* <ParticipantList
                  users={this.props.users.filter(
                    user => user.phase === phaseName
                  )}
                  phaseChance={this.props.phaseChance}
                  phases={this.props.phases}
                /> */}

                {!!users && (
                  <UserList
                    users={Object.values(users).filter(
                      user => user.phase === phaseName
                    )}
                    // users={this.props.users.filter(
                    //   user => user.phase === phaseName
                    // )}
                    phases={this.state.phases}
                    phaseChance={this.props.phaseChance}
                    phaseName={phaseName}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* {!!users && (
          <UserList
            users={users}
            phases={this.props.phases}
            phaseChance={this.props.phaseChance}
          />
        )} */}
      </div>
    );
  }
}

/* //<UserList />;
// const UserList = ({ users }) => (
//   <div>
//     <h2>List of Usernames of Users</h2>
//     <p>(Saved on Sign Up in Firebase Database)</p>
//
//     {Object.keys(users).map(key => (
//       <div key={key}>
//         {users[key].username}, {users[key].email}, {users[key].phase}
//       </div>
//     ))}
//   </div>
// ); */

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
