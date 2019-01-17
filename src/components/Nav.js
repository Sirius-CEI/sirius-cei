import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'

const drawerWidth = 240;

const styles = theme => ({
  root: {
		display: 'flex',
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
  appBar: {
		// boxShadow: 'none',
		...theme.mixins.toolbar,
		padding: theme.spacing.unit,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
		}),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
		}),
	},
	logo: {
		height: theme.mixins.toolbar.minHeight
	},
	links: {
		flexGrow: 1,
		margin: theme.spacing.unit,
	},
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
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
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
	},
});

class Nav extends React.Component {
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
    const { classes, outcomeAreas } = this.props;
    const { open } = this.state;

    return (
			<div className={classes.root}>
        <AppBar
					position="sticky"
					color="default"
          className={classnames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
						<Hidden mdUp>
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={this.handleDrawerOpen}
								className={classnames(classes.menuButton, open && classes.hide)}
							>
								<MenuIcon color="primary" />
							</IconButton>
						</Hidden>
						<Hidden smDown>
							<Grid
								container
								direction="row"
								alignItems="center"
								justify="space-between"
							>
								<Grid item>
									<Button component={Link} to="/macro-indicators">
										<img src="/images/CEI_Logo.png" alt="logo" className={classes.logo}/>
									</Button>
								</Grid>
								<Grid item>
									{outcomeAreas.length > 0 && outcomeAreas.map((item, index) => (
										<Button
											key={index}
											component={Link}
											to={item.route}
											color="primary"
											className={classes.buttons}
										>
											{item.title}
										</Button>
									))}
								</Grid>
							</Grid>
						</Hidden>
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
              <ChevronLeftIcon />
            </IconButton>
          </div>
					<Divider />
          <List className={classes.content}>
						{outcomeAreas.length > 1 && outcomeAreas.map((item, index) => (
							<ListItem
								button
								key={index}
								component={Link}
								to={item.route}
								onClick={this.handleDrawerClose}
							>
								<ListItemText primary={item.title} />
							</ListItem>
						))}
          </List>
          <Divider />
        </Drawer>
      </div>
		)
  }
}

Nav.propTypes = {
	classes: PropTypes.object.isRequired,
	width: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  outcomeAreas: state.outcomes,
});

export default compose(
	connect(mapStateToProps),
  withStyles(styles),
  withWidth(),
)(Nav);