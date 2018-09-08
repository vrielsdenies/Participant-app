import React from "react";
import CompanyParticipant from "../Company-participant/Companyparticipant";
//import { Route, Link } from "react-router-dom";

import "./CompanyDetail.css";

class CompanyDetail extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.match.params.company_name}</h1>
        <h3>Deelnemers</h3>
        {this.props.users.map(user => {
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
