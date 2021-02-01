import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import {
  Grid,
  Box,
  Avatar,
  Card,
  CardContent,
  Typography,
  CardActions,
  Chip,
  IconButton,
  Popover,
  Container,
  Fade,
} from "@material-ui/core";
import moment from "moment";
import CommentIcon from "@material-ui/icons/Comment";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import PostComment from "../components/PostComment";
import { FETCH_POST_QUERY, CREATE_COMMENT } from "../util/graphql";
import FooterContent from "../components/FooterContent";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  root: {
    paddingBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#bbb",
    borderRadius: 19,
    [theme.breakpoints.down("md")]: {
      width: 500,
    },
    [theme.breakpoints.down("sm")]: {
      width: 500,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  username: {
    fontWeight: "bold",
  },
  cardActions: {
    width: "100%",
    borderTop: "1px solid #333",
    marginBottom: "-10px",
  },
  comment: {
    color: "aqua",
  },
  noComment: {
    color: "#aaa",
  },
  commentButton: {
    position: "relative",
    left: "-20%",
    [theme.breakpoints.down("xs")]: {
      left: "-2%",
    },
  },
  cardComment: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#aaa",
    borderRadius: 9,
    marginBottom: 5,
    padding: "7px 9px",
  },
  deletePost: {
    position: "relative",
    right: "-65%",
    [theme.breakpoints.down("md")]: {
      right: "-50%",
    },
    [theme.breakpoints.down("xs")]: {
      right: "-9%",
    },
  },
  deleteComment: {
    position: "relative",
    right: 5,
  },
  avatarComment: {
    marginTop: 4,
    marginRight: 5,
    width: 40,
    height: 40,
    [theme.breakpoints.down("xs")]: {
      width: 30,
      height: 30,
    },
  },
}));

export default function SinglePost(props) {
  const classes = useStyles();
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const [checked, setChecked] = React.useState(false);
  const [bodyComment, setBodyComment] = useState("");

  // TODO: for pop over
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  // ---->

  React.useEffect(() => {
    setChecked(true);
  }, []);

  const {
    data: { getPost },
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  console.log(bodyComment, "iki body");

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: {
      postId: postId,
      body: bodyComment,
    },
    update() {
      setBodyComment("");
    },
  });

  const onChange = (event) => {
    setBodyComment(event.target.value);
  };

  let postMarkup;
  const loadingPost = (
    <Grid item xs={12} align="center" style={{ paddingTop: "20%" }}>
      <CircularProgress style={{ color: "white" }} />
    </Grid>
  );

  if (!getPost && getPost === undefined) {
    return loadingPost;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <>
        <NavBar />
        <br />
        <Container>
          <Grid container spacing={1} justify="center">
            <Grid item lg={6}>
              <Fade in={checked} {...(checked ? { timeout: 1500 } : {})}>
                <Card className={classes.root}>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item lg={1} style={{ marginRight: 10 }}>
                        <Avatar style={{ width: 50, height: 50 }} alt="Natacha">
                          {username.slice(0, 1).toUpperCase()}
                        </Avatar>
                      </Grid>
                      <Grid item lg={10}>
                        <Typography variant="h5" className={classes.username}>
                          {username}
                        </Typography>
                        <Typography
                          component={Link}
                          variant="h6"
                          style={{
                            color: "#777",
                            textDecoration: "none",
                            fontSize: 16,
                          }}
                          to={`/posts/${id}`}
                        >
                          {moment(createdAt).fromNow()}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="h6">{body}</Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <LikeButton
                      user={user}
                      likeCount={likeCount}
                      id={id}
                      likes={likes}
                    />
                    <IconButton
                      aria-owns={open ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                      variant="contained"
                      className={classes.comment}
                    >
                      <CommentIcon />
                    </IconButton>
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
                        style={{
                          padding: "0 5px",
                          background: "#333",
                          color: "white",
                        }}
                      >
                        Comment post
                      </Typography>
                    </Popover>
                    <Chip
                      style={{
                        border: "1px solid #444",
                        backgroundColor: "rgba(0,0,0, 0.1)",
                        color: comments.length > 0 ? "aqua" : "#777",
                      }}
                      label={commentCount}
                    />
                    {/* <Typography className={classes.deletePost}> */}
                    {/*   {user && user.username === username && ( */}
                    {/*     <DeleteButton */}
                    {/*       postId={postId} */}
                    {/*       callBack={deletePostCallback} */}
                    {/*     /> */}
                    {/*   )} */}
                    {/* </Typography> */}
                  </CardActions>
                  <br />
                  <Container>
                    <PostComment
                      user={user}
                      createComment={createComment}
                      bodyComment={bodyComment}
                      onChange={onChange}
                    />
                  </Container>
                  <CardContent>
                    {comments.map((comment, index) => (
                      <Box
                        key={index}
                        style={{ display: "flex", justifyContent: "start" }}
                      >
                        <Avatar className={classes.avatarComment}>
                          {comment.username.slice(0, 1).toUpperCase()}
                        </Avatar>

                        <Card className={classes.cardComment}>
                          <Typography
                            variant="h6"
                            style={{ fontSize: 16, fontWeight: "bold" }}
                          >
                            {comment.username}
                          </Typography>
                          <Typography variant="div">{comment.body}</Typography>
                        </Card>
                        <span className={classes.deleteComment}>
                          {user && comment.username === user.username && (
                            <DeleteButton
                              postId={postId}
                              commentId={comment.id}
                            />
                          )}
                        </span>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          </Grid>
        </Container>
        <FooterContent />
      </>
    );
  }

  return postMarkup;
}
