import React from "react";
import NavBar from "../components/NavBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import FooterContent from "../components/FooterContent";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_POST_QUERY } from "../util/graphql";
import SkeletonContent from "../components/SkeletonContent";
import SinglePostCard from "../components/SinglePostCard";

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    padding: "50px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 0",
    },
  },
  loading: {
    margin: "0 auto",
    color: "white",
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const location = useLocation();
  const postId = props.match.params.postId;
  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  return (
    <>
      <NavBar />
      <CssBaseline />
      <Grid container spacing={1} className={classes.cardWrapper}>
        {loading ? (
          <SkeletonContent grid={12} widthSkeleton="550px" />
        ) : (
          <SinglePostCard postId={postId} data={data} />
        )}
      </Grid>
      <FooterContent data={data} location={location.pathname} />
    </>
  );
}
