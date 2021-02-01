import React from "react";
import { Box, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";

const useStyles = makeStyles((theme) => ({
  navlink: {
    color: "#aaa",
    textDecoration: "none",
    marginRight: 20,
    padding: "7px 22px",
    borderRadius: 19,
    fontWeight: 600,
    fontSize: "16px",
    "&:hover": {
      color: "pink",
    },
  },
  textAlign: "right",
  wrapper: {
    winWidth: 200,
    position: "absolute",
    right: 10,
    top: 0,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  authWrapper: {
    winWidth: 200,
    position: "absolute",
    right: 10,
    top: 21,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  active: {
    color: "#ccc",
    padding: "7px 22px",
    border: "1px solid #ccc",
    borderRadius: 19,
    "&:hover": {
      border: "1px solid pink",
    },
  },
  brand: {
    color: "#ccc",
    fontWeight: "bold",
    "&:hover": {
      color: "pink",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: -25,
    },
  },
}));

export default function NavbarMenu({ user, logout }) {
  const classes = useStyles();

  const menuBar = user ? (
    <Box>
      <IconButton component={NavLink} className={classes.brand} exact to="/">
        SocialApp
      </IconButton>
      <Box className={classes.wrapper}>
        <UserMenu user={user} logout={logout} />
      </Box>
    </Box>
  ) : (
    <>
      <IconButton className={classes.brand} component={NavLink} exact to="/">
        SocialApp
      </IconButton>
      <Box className={classes.authWrapper}>
        <NavLink
          className={classes.navlink}
          activeClassName={classes.active}
          to="/register"
        >
          Register
        </NavLink>
        <NavLink
          className={classes.navlink}
          activeClassName={classes.active}
          to="/login"
        >
          Login
        </NavLink>
      </Box>
    </>
  );
  return <>{menuBar}</>;
}
