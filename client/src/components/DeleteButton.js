import React, { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMutation } from "@apollo/react-hooks";
import {
  FETCH_POSTS_QUERY,
  DELETE_COMMENT,
  DELETE_POST,
} from "../util/graphql";
import PopOver from "./PopOver";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    fontWeight: "bold",
  },
  deleteIcon: {
    color: "#f32013",
  },
  dialog: {
    style: {
      backgroundColor: "rgba(0,0,0,0.9)",
      borderRadius: 7,
      boxShadow: "none",
      top: -70,
    },
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function DeleteButton({
  postId,
  callBack,
  commentId,
  setDataCommentCount,
  setDataComments,
}) {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);

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

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const deleteCommentOrPost = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deleteMutation, { loading }] = useMutation(deleteCommentOrPost, {
    variables: {
      postId,
      commentId,
    },
    update(proxy, result) {
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
        callBack();
      }
      // TODO : handle update delete comment
      const newComments = result?.data?.deleteComment?.comments;
      setDataCommentCount(newComments?.length);
      setDataComments(newComments);
      setOpenModal(false);
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    deleteMutation();
  };

  return (
    <>
      <IconButton
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={classes.delete}
        onClick={handleClickOpen}
      >
        <DeleteIcon className={classes.deleteIcon} />
      </IconButton>
      <PopOver
        handlePopoverClose={handlePopoverClose}
        open={open}
        commentId={commentId}
        anchorEl={anchorEl}
        popOverText={commentId ? "Delete comment" : "Delete post"}
      />
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        transitionDuration={300}
        onClose={handleClose}
        onEscapeKeyDown={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title" style={{ color: "#aaa" }}>
          {"Are you sure to delete this field?"}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            autoFocus
            onClick={handleClose}
            color="secondary"
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            color="primary"
            size="small"
            autoFocus
            className={classes.button}
          >
            {loading ? (
              <CircularProgress size={24} style={{ color: "white" }} />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
