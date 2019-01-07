import React, { Component } from "react";
import UserList from "./UserList";
import Typography from "@material-ui/core/Typography";

import withAuthorization from "../WithAuthorization/WithAuthorization";
import { db } from "../../Firebase";

import "./Home.css";

//function below filters user list based on username & searchTerm
const isSearched = searchTerm => item =>
  item.username.toLowerCase().includes(searchTerm.toLowerCase());

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      searchTerm: ""
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <div className="Filter">
          <form>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input"
                type="text"
                id="search"
                onChange={this.onSearchChange}
                placeholder="Search for user"
              />
            </div>
          </form>
        </div>
        <div className="Pipeline-Columns">
          {this.props.phases.map(phaseName => {
            return (
              <div className="Pipeline-Column" key={phaseName}>
                <div className="Column-Header">
                  <Typography paragraph variant="title">
                    {phaseName}
                  </Typography>
                </div>

                {!!users && (
                  <UserList
                    //Object.values makes an array from the users object. List gets filtered by phasename and searchterm
                    users={Object.values(users)
                      .filter(isSearched(this.state.searchTerm))
                      .filter(user => user.phase === phaseName)}
                    phases={this.props.phases}
                    phaseChance={this.props.phaseChance}
                    phaseName={phaseName}
                  />
                )}
              </div>
            );
          })}
        </div>
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
