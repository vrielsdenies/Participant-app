import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
//import classnames from "classnames";
import { Link } from "react-router-dom";

import "./Company.css";

const styles = theme => ({
  card: {
    maxWidth: 400
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

class Company extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="Company">
        <Card className={classes.card}>
          <CardContent>
            <Link to={`/companies/${this.props.company.name}`}>
              <Typography paragraph variant="title">
                {this.props.company.name}
              </Typography>
            </Link>
            <Typography>{this.props.company.address}</Typography>
            <Typography>{this.props.company.place}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Company.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Company);
