import React, { Component } from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import HomePage from "../Home/Home";
import Dashboard from "../DashboardPage/Dashboard";
import SignUpPage from "../SignUpPage/Signup";
import SignInPage from "../SignInPage/Signin";
import AccountPage from "../Account/Account";
import PasswordForgetPage from "../PasswordforgetPage/Passwordforget";
import PasswordChangeForm from "../PasswordchangeForm/Passwordchangeform";
import Companies from "../CompaniesPage/Companies";
import CompanyDetail from "../CompaniesPage/CompanyDetail/CompanyDetail";
import ParticipantDetail from "../DashboardPage/Participantdetail/Participantdetail";
import { BrowserRouter, Route } from "react-router-dom";
import withAuthentication from "../WithAuthentication/withAuthentication";
//import { db } from "../../Firebase";

import * as routes from "../../Constants/Routes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phases: ["Nieuw", "Wachten", "Nog niet actief", "Actief", "Klaar"],
      //users: null,
      companies: [
        {
          name: "Advier",
          address: "Mijnbouwstraat 120",
          place: "Delft"
        },
        {
          name: "UVA",
          address: "Vrijheidslaan 20H",
          place: "Amsterdam"
        },
        {
          name: "Bunker Theaterzaken",
          address: "Kalverstraat 40",
          place: "Amsterdam"
        },
        {
          name: "UMCL",
          address: "Scheveningsestraat 2",
          place: "Leiden"
        },
        {
          name: "Gemeente Rotterdam",
          address: "Coolsingel 89",
          place: "Rotterdam"
        },
        {
          name: "013",
          address: "Tilburgestraat 120",
          place: "Tilburg"
        }
      ],

      participants: [
        {
          firstname: "Niels",
          lastname: "de Vries",
          emailaddress: "info@nielsdevries.net",
          place: "Amsterdam",
          company: "Advier",
          rides: 14,
          phase: "Actief"
        },
        {
          firstname: "Tilly",
          lastname: "Broersen",
          emailaddress: "tilly@advier.nl",
          place: "Voorburg",
          company: "Advier",
          rides: 32,
          phase: "Actief"
        },
        {
          firstname: "Eva",
          lastname: "Wartewig",
          emailaddress: "evawartewig@gmail.com",
          place: "Amsterdam",
          company: "UVA",
          rides: 64,
          phase: "Actief"
        },
        {
          firstname: "Mitsy",
          lastname: "Klare",
          emailaddress: "marjoleinklare@gmail.com",
          place: "Amsterdam",
          company: "Bunker Theaterzaken",
          rides: 0,
          phase: "Wachten"
        },
        {
          firstname: "GP",
          lastname: "Frank",
          emailaddress: "gpfrank@gmail.com",
          place: "Scheveningen",
          company: "UMCL",
          rides: 74,
          phase: "Nieuw"
        },
        {
          firstname: "Ferry",
          lastname: "Alsemgeest",
          emailaddress: "ferryalsemgeest@gmail.com",
          place: "Rotterdam",
          company: "Gemeente Rotterdam",
          rides: 34,
          phase: "Nog niet actief"
        },
        {
          firstname: "Emiel",
          lastname: "Haring",
          emailaddress: "emielharing@gmail.com",
          place: "Rotterdam",
          company: "013",
          rides: 73,
          phase: "Nieuw"
        }
      ]
    };

    this.handlePhaseChance = this.handlePhaseChance.bind(this);
  }

  // componentDidMount() {
  //   db.onceGetUsers().then(snapshot =>
  //     this.setState({ users: snapshot.val() })
  //   );
  // }

  handlePhaseChance(participant, event) {
    const newPhase = event;

    this.setState(currentState => {
      return {
        participants: currentState.participants
          .filter(participantTC => participantTC !== participant)
          .concat([
            {
              ...participant,
              phase: newPhase
            }
          ])
      };
    });
    console.log({ participant });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Navigation />

          <Route
            exact
            path={routes.HOME}
            render={() => {
              return (
                <HomePage
                  //phases={this.state.phases}
                  phaseChance={this.handlePhaseChance}
                />
              );
            }}
          />
          <Route
            exact
            path={routes.DASHBOARD}
            render={() => {
              return (
                <Dashboard
                  companies={this.state.companies}
                  participants={this.state.participants}
                  phases={this.state.phases}
                  phaseChance={this.handlePhaseChance}
                />
              );
            }}
          />
          <Route
            exact
            path={routes.SIGN_UP}
            render={() => {
              return <SignUpPage companies={this.state.companies} />;
            }}
          />
          <Route
            exact
            path={routes.SIGN_IN}
            render={() => {
              return <SignInPage />;
            }}
          />
          <Route
            exact
            path={routes.ACCOUNT}
            render={() => {
              return <AccountPage />;
            }}
          />
          <Route
            exact
            path={routes.PASSWORD_FORGET}
            render={() => {
              return <PasswordForgetPage />;
            }}
          />
          <Route
            exact
            path={routes.PASSWORD_CHANGE}
            render={() => {
              return <PasswordChangeForm />;
            }}
          />
          <Route
            exact
            path={routes.COMPANIES}
            render={() => {
              return <Companies companies={this.state.companies} />;
            }}
          />
          <Route
            exact
            path={routes.COMPANY}
            render={({ match }) => {
              return (
                <CompanyDetail
                  companies={this.state.companies}
                  users={this.state.users.filter(
                    user => user.company === match.params.company_name
                  )}
                  match={match}
                  //phases={this.state.phases}
                />
              );
            }}
          />
          <Route
            exact
            path={routes.PARTICIPANT}
            render={({ match }) => {
              return (
                <ParticipantDetail
                  participants={this.state.participants.filter(
                    user => user.emailaddress === match.params.user_emailaddress
                  )}
                  match={match}
                />
              );
            }}
          />
          {/* <Route
            exact
            path={routes.PARTICIPANT}
            render={({ match }) => {
              return (
                <ParticipantDetail
                  users={Object.values(users).filter(
                    user => user.email === phaseName
                  )}
                  match={match}
                />
              );
            }}
          /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default withAuthentication(App);
