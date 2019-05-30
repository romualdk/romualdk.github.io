import React from 'react';
import PropTypes from 'prop-types';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import TimerIcon from '@material-ui/icons/Timer';
import DetailsIcon from 'mdi-material-ui/ClipboardTextOutline';
import ShareIcon from '@material-ui/icons/Share';

import Timer from './timer';

import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import { inherits } from 'util';

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

class Index extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      
      <div className={classes.root}>
        <Timer />
        <BottomNavigation value="timer" className={classes.stickToBottom}>
          <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Timer" value="timer" icon={<TimerIcon />} />
          <BottomNavigationAction label="Details" value="details" icon={<DetailsIcon />} />
          <BottomNavigationAction label="Share" value="share" icon={<ShareIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
