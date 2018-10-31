import React from "react";
import CompanyParticipant from "../Company-participant/Companyparticipant";
import { db } from "../../../Firebase";

import "./CompanyDetail.css";

class CompanyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  render() {
    const { users } = this.state;
    //console.log("PARTICIPANTS", this.state.users);

    return (
      <div>
        <h1>{this.props.match.params.company_name}</h1>
        <h3>Deelnemers</h3>
        {!!users &&
          Object.values(users)
            .filter(
              user => user.company === this.props.match.params.company_name
            )
            .map(user => {
              return (
                <CompanyParticipant
                  user={user}
                  //phases={this.props.phases}
                  key={user.emailaddress}
                />
              );
            })}
      </div>
    );
  }
}

export default CompanyDetail;
