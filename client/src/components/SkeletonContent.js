import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { Grid } from "@material-ui/core";

export default function SkeletonContent({ grid, widthSkeleton }) {
  const useStyles = makeStyles((theme) => ({
    skeleton: {
      borderRadius: 19,
      width: widthSkeleton,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={grid} align="center">
        <Skeleton
          className={classes.skeleton}
          animation="wave"
          variant="rect"
          height={160}
        />
        <br />
        <Skeleton
          animation="wave"
          className={classes.skeleton}
          variant="text"
        />
        <Skeleton
          animation="wave"
          className={classes.skeleton}
          variant="text"
        />
        <Skeleton
          animation="wave"
          className={classes.skeleton}
          variant="text"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={grid} align="center">
        <Skeleton
          animation="wave"
          className={classes.skeleton}
          variant="rect"
          height={160}
        />
        <br />
        <Skeleton
          animation="wave"
          className={classes.skeleton}
          variant="text"
        />
        <Skeleton
          animation="wave"
          className={classes.skeleton}
          variant="text"
        />
        <Skeleton
          animation="wave"
          className={classes.skeleton}
          variant="text"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={grid} align="center">
        <Skeleton
          animation="wave"
          className={classes.skeleton}
          variant="rect"
          height={160}
        />
        <br />
        <Skeleton
          animation="wave"
          className={classes.skeleton}
          variant="text"
        />
        <Skeleton
          animation="wave"
          className={classes.skeleton}
          variant="text"
        />
        <Skeleton
          animation="wave"
          className={classes.skeleton}
          variant="text"
        />
      </Grid>
    </>
  );
}
