import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import { firebase } from "../../Firebase";

import "./Participant.css";

const styles = theme => ({
  card: {
    maxWidth: 300
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },

  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
});

class ParticipantFB extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "1",
      expanded: false
    };

    //this.handlePhaseChance = this.handlePhaseChance.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  // handlePhaseChance(event) {
  //   this.props.phaseChance(this.props.user, event.target.value);
  // }

  writeUserData(userId, phase) {
    firebase
      .database()
      .ref("users/" + userId)
      .set({
        phase: phase
      });
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
    console.log("handleExpandClick");
  };

  render() {
    const { classes } = this.props;
    //const { match } = this.props;
    //const fullName = `${this.props.user.firstname} ${this.props.user.lastname}`;

    return (
      <div className="Participant">
        <Card className={classes.card}>
          <CardContent>
            <Link to={`/user/${this.props.email}`}>
              <Typography paragraph variant="title">
                {this.props.username}
              </Typography>
            </Link>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <Icon>expand_more</Icon>
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>{this.props.email}</Typography>
              <Typography>{this.props.phase}</Typography>
              <Typography>{this.props.id}</Typography>

              <TextField
                select
                value={this.props.phase}
                onChange={this.writeUserData}
              >
                {this.props.phases.map(phase => (
                  <MenuItem key={phase} value={phase}>
                    {phase}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

ParticipantFB.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ParticipantFB);
