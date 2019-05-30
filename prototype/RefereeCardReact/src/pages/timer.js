import React from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GoalIcon from 'mdi-material-ui/Soccer';
import CardIcon from 'mdi-material-ui/Cards';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  team: {
    marginTop: 24,
    marginBottom: 12,
  },
  score: {
    marginBottom: 24,
  },
  timer: {
    margin: 24,
    marginTop: 48,
    marginBottom: 24,
  },

  play: {
    height: 96,
    width: 96,
  },
  playArrow: {
    width: 48,
    height: 48,
  },
  goal: {
    margin: 24,
  },
  card: {
    margin: 24,
  },
  goalIcon: {
    width: 32,
    height: 32,
  },
  cardIcon: {
    width: 32,
    height: 32
  },
});

class Timer extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <Grid container>
    <Grid container spacing={24} direction="row">
        <Grid item xs={12}>
          <Paper square>
          <Grid container>
            <Grid item xs><Typography variant="h6" className={classes.team}>MANTIKA</Typography></Grid>
            <Grid time xs><Typography variant="h6" className={classes.team}>MEGAMEBLE</Typography></Grid>
          </Grid>
          <Grid container>
            <Grid item xs><Typography variant="h3" className={classes.score}>0</Typography></Grid>
            <Grid time xs><Typography variant="h3" className={classes.score}>1</Typography></Grid>
          </Grid>
          </Paper>
          
          <Typography variant="h1" className={classes.timer}>
            24:07
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Fab color="secondary" className={classes.goal}><GoalIcon className={classes.goalIcon} /></Fab>
          <Fab color="primary" aria-label="Start" className={classes.play}><PlayArrowIcon className={classes.playArrow} /></Fab>
          <Fab color="secondary" className={classes.card}><CardIcon className={classes.cardIcon} /></Fab>
        </Grid>
      </Grid>

        
      </Grid>
    );

  }
}


Timer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Timer);
