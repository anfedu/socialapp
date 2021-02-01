import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Chip, Popover, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { useMutation } from "@apollo/react-hooks";
import { LIKE_POST_MUTATION } from "../util/graphql";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  like: {
    color: "#aaa",
  },
  popover: {
    pointerEvents: "none",
  },
}));

export default function LikeButton({ user, likeCount, id, likes }) {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);

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

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost, { loading }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeCountColor = likeCount > 0 ? "pink" : "#777";

  const likeText = liked ? "Unlike" : "Like";
  const PopOver = () => {
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
          {likeText}
        </Typography>
      </Popover>
    );
  };

  const likeButton = user ? (
    liked ? (
      <>
        <IconButton
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          variant="contained"
          onClick={likePost}
        >
          {loading ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : (
            <ThumbUpAltIcon
              style={{
                color: "pink",
              }}
            />
          )}
        </IconButton>
        <PopOver />
      </>
    ) : (
      <>
        <IconButton
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          variant="contained"
          className={classes.like}
          onClick={likePost}
        >
          {loading ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : (
            <ThumbUpAltIcon />
          )}
        </IconButton>
        <PopOver />
      </>
    )
  ) : (
    <>
      <IconButton
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        component={Link}
        to="/login"
        variant="contained"
        className={classes.like}
        onClick={likePost}
      >
        {loading ? (
          <CircularProgress size={24} style={{ color: "white" }} />
        ) : (
          <ThumbUpAltIcon />
        )}
      </IconButton>
      <PopOver />
    </>
  );

  return (
    <div>
      {likeButton}
      <Chip
        style={{
          border: "1px solid #444",
          backgroundColor: "rgba(0,0,0, 0.1)",
          color: likeCountColor,
        }}
        label={likeCount}
      />
    </div>
  );
}
