import React from "react";
import { db } from "../../../Firebase";
import withAuthorization from "../../WithAuthorization/WithAuthorization";
//import { Route } from "react-router-dom";

import "./Participantdetail.css";

class ParticipantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: "",
      phase: "",
      company: "",
      uid: "",
      company_address: "Address",
      company_place: "Place",
      compnay_postcode: "Postcode"
    };
  }

  componentDidMount() {
    const path = window.location.pathname.split("/");
    const uidFromPath = path[2];
    console.log("uidFromPath", uidFromPath);

    // db.onceGetUser(uidFromPath).then(snapshot =>
    //   this.setState({
    //     username: snapshot.val() && snapshot.val().username,
    //     email: snapshot.val() && snapshot.val().email,
    //     phase: snapshot.val() && snapshot.val().phase,
    //     company: snapshot.val() && snapshot.val().company
    //   })
    // );
    //
    // db.onceGetCompany("Bunker Theaterzaken").then(snapshot =>
    //   this.setState({
    //     company_address: snapshot.val() && snapshot.val().address,
    //     company_place: snapshot.val() && snapshot.val().place,
    //     company_postcode: snapshot.val() && snapshot.val().postcode
    //   })
    // );

    db.onceGetUser(uidFromPath)
      .then(snapshot => {
        const companyName = snapshot.val() && snapshot.val().company;
        console.log("COMPANY = ", companyName);

        this.setState({
          username: snapshot.val() && snapshot.val().username,
          email: snapshot.val() && snapshot.val().email,
          phase: snapshot.val() && snapshot.val().phase,
          company: snapshot.val() && snapshot.val().company
        });
      })
      .then(
        db.onceGetCompany("Advier").then(snapshot =>
          this.setState({
            company_address: snapshot.val() && snapshot.val().address,
            company_place: snapshot.val() && snapshot.val().place,
            company_postcode: snapshot.val() && snapshot.val().postcode
          })
        )
      );
  }

  render() {
    console.log("company address = ", this.state.company_address);
    return (
      <div className="ParticipantPage">
        <div>
          <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h2 className="mdl-card__title-text">{this.state.username}</h2>
            </div>
            <div>
              <h4>{this.state.email}</h4>
              <h4>{this.state.phase}</h4>
            </div>
          </div>
        </div>
        <div className="CompanyInfo">
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h2 className="mdl-card__title-text">{this.state.company}</h2>
            </div>
            <div>
              <h4>{this.state.company_place}</h4>
              <h4>{this.state.company_address}</h4>
              <h4>{this.state.company_postcode}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(ParticipantDetail);
