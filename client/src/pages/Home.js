import React from "react";
import NavBar from "../components/NavBar";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import FooterContent from "../components/FooterContent";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import SkeletonContent from "../components/SkeletonContent";

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    padding: "0 50px",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 0",
    },
  },
  loading: {
    margin: "0 auto",
    color: "white",
  },
}));

export default function Home() {
  const classes = useStyles();
  const location = useLocation();
  const { data, loading } = useQuery(FETCH_POSTS_QUERY);

  return (
    <>
      <NavBar />
      <CssBaseline />
      <Container>
        <Grid container spacing={3} className={classes.cardWrapper}>
          <Grid item xs={12}>
            <PostForm />
          </Grid>
          {loading ? (
            <SkeletonContent grid={4} widthSkeleton="100%" />
          ) : (
            data?.getPosts?.map((post, index) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={post.id}>
                <PostCard post={post} index={index} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      <FooterContent data={data} location={location.pathname} />
    </>
  );
}
