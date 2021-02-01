import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#ccc",
    backgroundColor: "rgba(18,18,18,0.7)",
    position: "fixed",
    width: "100vw",
    bottom: 0,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  homeRoot: {
    color: "#ccc",
    backgroundColor: "rgba(0,0,0,0.1)",
    position: "relative",
    width: "100vw",
    bottom: 0,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  copy: {
    fontSize: 15,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
}));

export default function Footer({ data, location }) {
  const classes = useStyles();

  return (
    <>
      {/* <Slide */}
      {/*   direction="up" */}
      {/*   in={matches ? true : !checked} */}
      {/*   mountOnEnter */}
      {/*   unmountOnExit */}
      {/* > */}
      <br />
      <br />
      <br />
      <Box className={classes.root}>
        <Typography className={classes.copy}>
          Copyright &copy; Ahmad Nuril Firdaus | 2021
        </Typography>
      </Box>
      {/* </Slide> */}
    </>
  );
}
