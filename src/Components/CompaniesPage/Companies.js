import React from "react";
import CompanyList from "./Companylist/Companylist";
import { db } from "../../Firebase";

import "./Companies.css";

class Companies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    };
  }

  componentDidMount() {
    db.onceGetCompanies().then(snapshot =>
      this.setState({ companies: snapshot.val() })
    );
  }

  render() {
    const { companies } = this.state;
    console.log(this.state.companies);

    return (
      <div>
        <div className="Companies">
          <div>
            <h1>Deelnemende bedrijven</h1>
          </div>
          <CompanyList companies={this.state.companies} />
        </div>
      </div>
    );
  }
}

export default Companies;
