import React from "react";
import Company from "../Company/Company";
import "./Companylist.css";

class CompanyList extends React.Component {
  render() {
    return (
      <div className="CompanyList">
        {this.props.companies.map(company => {
          return (
            <Company
              key={company.name}
              company={company}
              name={company.name}
              address={company.address}
              place={company.place}
            />
          );
        })}
      </div>
    );
  }
}

export default CompanyList;
