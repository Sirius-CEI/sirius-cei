import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import 'typeface-lato';

const drawerWidth = 280;

const styles = theme => ({
  root: {
		display: 'flex',
		flexGrow: 1,
  },
  appBar: {
    padding: '1% 0',
    background: 'transparent',
    boxShadow: 'none',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    color: '#008ab7',
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#008ab7',
    textTransform: 'uppercase',
    letterSpacing: '1.53px',
    lineHeight: '1em',
    fontFamily: 'Lato',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: '13px',
    marginRight: '2%',
    "&:hover, active": {
      color: '#ffc432'
    },
  },
  linkDrawer: {
    textDecoration: 'none',
    color: '#008ab7',
    textTransform: 'uppercase',
    letterSpacing: '1.53px',
    lineHeight: '3em',
    fontFamily: 'Lato',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: '13px',
    "&:hover, active": {
      color: '#ffc432'
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
});

class Nav extends Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="static"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
        
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MediaQuery maxWidth={768}>
                <MenuIcon />
              </MediaQuery>
            </IconButton>

            <MediaQuery className={classes.logo} minWidth={768}>
              <Link to="/macro">
                <img src="/images/CEI_Logo.png" alt="logo" height="100" width="100" />
              </Link>
            </MediaQuery>
            
            <Typography className={classes.grow}/>

            <MediaQuery minWidth={768}>
              <Link className={classes.link} to="/macro">Macro</Link>
              <Link className={classes.link} to="/economic-development">Economic Development</Link>
              <Link className={classes.link} to="/human-capital">Human Capital</Link>
              <Link className={classes.link} to="/access-transit">Access & Transit</Link>
            </MediaQuery>
          </Toolbar>
        </AppBar>
        
        <Drawer
          className={classes.drawer}
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          
          <Divider />
          <List className={classes.content}>
              <ListItem button>
                <Link className={classes.linkDrawer} to="/macro">+ Macro</Link>
              </ListItem>
              <ListItem button>
                <Link className={classes.linkDrawer} to="/economic-development">+ Economic Development</Link>
              </ListItem>
              <ListItem button>
                <Link className={classes.linkDrawer} to="/human-capital">+ Human Capital</Link>
              </ListItem>
              <ListItem button>
                <Link className={classes.linkDrawer} to="/access-transit">+ Access & Transit</Link>
              </ListItem>
          </List>
          <Divider />
        </Drawer>
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Nav);