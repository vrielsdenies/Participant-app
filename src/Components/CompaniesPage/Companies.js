import React from "react";
import CompanyList from "./Companylist/Companylist";
import "./Companies.css";

class Companies extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>Deelnemende bedrijven</h1>
        </div>
        <div className="Companies">
          <CompanyList companies={this.props.companies} />
        </div>
      </div>
    );
  }
}

export default Companies;
