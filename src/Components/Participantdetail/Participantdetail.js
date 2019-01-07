import React from "react";
import { db } from "../../Firebase";
import withAuthorization from "../WithAuthorization/WithAuthorization";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import "./Participantdetail.css";

class ParticipantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: "",
      phase: "",
      phases: ["Nieuw", "Wachten", "Nog niet actief", "Actief", "Klaar"],
      company: "",
      uid: "",
      company_address: "",
      company_place: "",
      compnay_postcode: ""
    };
    this.writeUserData = this.writeUserData.bind(this);
  }

  componentDidMount() {
    const path = window.location.pathname.split("/");
    const uidFromPath = path[2];
    const companyName = "Advier";

    db.onceGetUser(uidFromPath)
      .then(snapshot => {
        this.setState({
          username: snapshot.val() && snapshot.val().username,
          email: snapshot.val() && snapshot.val().email,
          phase: snapshot.val() && snapshot.val().phase,
          company: snapshot.val() && snapshot.val().company,
          uid: uidFromPath
        });
      })
      .then(
        db.onceGetCompany(companyName).then(snapshot => {
          console.log("this.state.company =", this.state.company);
          this.setState({
            company_address: snapshot.val() && snapshot.val().address,
            company_place: snapshot.val() && snapshot.val().place,
            company_postcode: snapshot.val() && snapshot.val().postcode
          });
        })
      );
  }

  writeUserData(event) {
    const newPhase = event.target.value;

    db.updatePhase(this.state.uid, this.state.phase, newPhase);

    this.setState({
      phase: newPhase
    });
  }

  render() {
    return (
      <div className="ParticipantPage">
        <div>
          <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h2 className="mdl-card__title-text">{this.state.username}</h2>
            </div>
            <div>
              <h4>E-mail: {this.state.email}</h4>
              <h4>Fase: {this.state.phase}</h4>
              <TextField
                select
                value={this.state.phase}
                onChange={this.writeUserData}
              >
                {this.props.phases.map(phase => (
                  <MenuItem key={phase} value={phase}>
                    {phase}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>
        <div className="CompanyInfo">
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <Link to={`/companies/${this.state.company}`}>
                <h2 className="mdl-card__title-text">{this.state.company}</h2>{" "}
              </Link>
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
