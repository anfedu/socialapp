import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MobilRightMenuSlider from "@material-ui/core/Drawer";
import { Box, List, Button, ListItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "rgba(0,0,0, 0.7)",
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
    position: "absolute",
    left: "2rem",
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
    },
  },
  listContainer: {
    width: "200px",
    height: "100vh",
    paddingTop: 20,
    overflowX: "hidden",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  navlink: {
    width: "100vw",
    textDecoration: "none",
    color: "white",
    fontSize: "14px",
    fontWeight: 600,
    marginInline: 20,
    letterSpacing: 0.5,
  },
  button: {
    fontSize: "14px",
    color: "white",
    backgroundColor: "#e48800",
    height: 33,
    width: 100,
    borderRadius: 17,
    textTransform: "none",
  },
  navlinkActive: {
    color: "aqua",
  },
  menuWrapper: {
    position: "absolute",
    right: 5,
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}));

export default function SwipeableTemporaryDrawer({ user, logout }) {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const ListMenu = () => (
    <Box
      onClick={() => setState({ right: false })}
      className={classes.listContainer}
      component="div"
    >
      {user ? (
        <UserMenu user={user} logout={logout} />
      ) : (
        <List>
          <ListItem
            component={NavLink}
            exact
            className={classes.navlink}
            activeClassName={classes.navlinkActive}
            to="/"
          >
            Home
          </ListItem>

          <ListItem
            className={classes.navlink}
            activeClassName={classes.navlinkActive}
            component={NavLink}
            to="/register"
          >
            Register
          </ListItem>

          <ListItem
            className={classes.navlink}
            activeClassName={classes.navlinkActive}
            component={NavLink}
            to="/login"
          >
            Login
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <div className={classes.menuWrapper}>
      <React.Fragment>
        <Button onClick={toggleDrawer("right", true)}>
          <MenuIcon
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          />
        </Button>
        <MobilRightMenuSlider
          classes={{
            paper: classes.paper,
          }}
          anchor={"right"}
          open={state.right}
          onClose={toggleDrawer("right", false)}
        >
          <ListMenu />
        </MobilRightMenuSlider>
      </React.Fragment>
    </div>
  );
}
