import React from "react";
import ParticipantList from "../Participantlist/Participantlist";
import Typography from "@material-ui/core/Typography";
import "./Pipeline.css";

class Pipeline extends React.Component {
  render() {
    return (
      <div className="Pipeline-Columns">
        {this.props.phases.map(phaseName => {
          return (
            <div className="Pipeline-Column" key={phaseName}>
              <div className="Column-Header">
                <Typography paragraph variant="title">
                  {phaseName}
                </Typography>
              </div>

              <ParticipantList
                participants={this.props.participants.filter(
                  participant => participant.phase === phaseName
                )}
                phaseChance={this.props.phaseChance}
                phases={this.props.phases}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Pipeline;
