import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textfield: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#777",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "pink",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#888",
    },
  },
  cssLabel: {
    color: "#ccc",
  },
  cssOutlinedInput: {
    color: "#ccc",
  },
  cssFocused: {
    color: "#ccc",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderRadius: 21,
  },
}));

export default function PostComment({
  user,
  createComment,
  bodyComment,
  onChange,
}) {
  const classes = useStyles();
  return (
    <>
      {user && (
        <form action="">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              name="body"
              placeholder="Comment..."
              value={bodyComment}
              onChange={onChange}
              className={classes.textfield}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
                inputMode: "numeric",
              }}
            />
            <Button
              variant="contained"
              type="submit"
              style={{ display: "none" }}
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                createComment();
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
