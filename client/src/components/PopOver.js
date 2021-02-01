import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
}));

export default function PopOver({
  open,
  anchorEl,
  handlePopoverClose,
  popOverText,
}) {
  const classes = useStyles();
  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Typography
        style={{ padding: "0 5px", background: "#333", color: "white" }}
      >
        {popOverText}
      </Typography>
    </Popover>
  );
}
