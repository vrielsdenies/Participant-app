import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
import "./Companyparticipant.css";

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

class CompanyParticipant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "1",
      expanded: false
    };

    this.handlePhaseChance = this.handlePhaseChance.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handlePhaseChance(event) {
    this.props.phaseChance(this.props.user, event.target.value);
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
    console.log("handleExpandClick");
  };

  render() {
    const { classes } = this.props;
    //const { match } = this.props;
    const fullName = `${this.props.user.firstname} ${this.props.user.lastname}`;

    return (
      <div className="CompanyParticipant">
        <Badge
          color="primary"
          badgeContent={this.props.user.rides}
          className="Badge"
        >
          <Card className={classes.card}>
            <CardContent>
              <Link to={`/user/${this.props.user.emailaddress}`}>
                <Typography paragraph variant="title">
                  {fullName}
                </Typography>
              </Link>
              <Link to={`/companies/${this.props.user.company}`}>
                <Typography>{this.props.user.company}</Typography>
              </Link>
            </CardContent>
          </Card>
        </Badge>
      </div>
    );
  }
}

CompanyParticipant.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CompanyParticipant);
