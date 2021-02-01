import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Grid,
  Chip,
  IconButton,
  Grow,
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import CommentIcon from "@material-ui/icons/Comment";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import PopOver from "./PopOver";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#bbb",
    borderRadius: 19,
  },
  popover: {
    pointerEvents: "none",
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
    borderTop: "1px solid #888",
    marginBottom: "-10px",
  },
  noComment: {
    color: "#aaa",
  },
  comment: {
    color: "aqua",
  },
  deletePost: {
    position: "relative",
    right: "-33%",
    [theme.breakpoints.down("md")]: {
      right: "-53%",
    },
    [theme.breakpoints.down("xs")]: {
      right: "-23%",
    },
  },
}));

export default function PostCard({ post, index }) {
  const {
    body,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    createdAt,
    comments,
  } = post;

  const classes = useStyles();

  const { user } = useContext(AuthContext);

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

  // TODO: for transition
  const [checked, setChecked] = useState(false);
  React.useEffect(() => {
    setChecked(true);
  }, []);
  // ---->

  return (
    <Grow
      in={checked}
      {...(checked ? { timeout: 2000 } : {})}
      collapsedheight={0}
    >
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item lg={2}>
              <Avatar alt="Natacha">
                {username.slice(0, 1).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="h5" className={classes.username}>
                {username}
              </Typography>
              <Typography
                component={Link}
                variant="h6"
                style={{ color: "#777", textDecoration: "none", fontSize: 16 }}
                to={`/posts/${id}`}
              >
                {moment(createdAt).fromNow()}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h6">
            {body.length > 30 ? body.substr(0, 30) + "..." : body}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <LikeButton
            variant="body1"
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
            component={Link}
            to={user ? `/posts/${id}` : "/login"}
            className={
              comments.length > 0 ? classes.comment : classes.noComment
            }
          >
            <CommentIcon />
          </IconButton>
          <Chip
            style={{
              border: "1px solid #444",
              backgroundColor: "rgba(0,0,0, 0.1)",
              color: comments.length > 0 ? "aqua" : "#777",
            }}
            label={commentCount}
          />
          <PopOver
            handlePopoverClose={handlePopoverClose}
            open={open}
            anchorEl={anchorEl}
            popOverText="Comment "
          />
          <span className={classes.deletePost}>
            {user && user.username === username && <DeleteButton postId={id} />}
          </span>
        </CardActions>
      </Card>
    </Grow>
  );
}
