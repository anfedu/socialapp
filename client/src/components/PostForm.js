import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "../util/hooks";
import { Button, TextField, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY, CREATE_POST_MUTATION } from "../util/graphql";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
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
    borderRadius: 19,
  },
  buttonWrapper: {
    position: "absolute",
    marginTop: 3,
    [theme.breakpoints.down("md")]: {
      position: "relative",
      right: "0%",
      width: "30%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  button: {
    backgroundColor: "aqua",
    fontWeight: "bold",
    textTransform: "none",
    borderRadius: 19,
    marginLeft: 5,
    [theme.breakpoints.down("md")]: {
      width: "30%",
      marginLeft: 0,
      marginTop: 5,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  textfield: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#777",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "pink",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#aaa",
    },
  },
  alert: {
    margin: "5px 0",
    border: "1px solid rgba(156, 39, 176, 0.8)",
    borderRadius: 25,
    height: "70%",
    width: "100%",
    backgroundColor: "rgba(156, 39, 176, 0.2)",
    color: "#ccc",
    display: "flex",
    alignItems: "center",
  },
}));

export default function PostForm(props) {
  const classes = useStyles();
  const [errors, setErrors] = useState("");
  const { onChange, handleSubmit, values } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <div className={classes.root}>
      <form action="" noValidate>
        <h1 style={{ textAlign: "center", color: "#aaa" }}>Create a post:</h1>
        <Grid container justify="center" style={{ marginBottom: 10 }}>
          {Object.keys(errors).length > 0 && (
            <Grid item xs={12} lg={5}>
              <Alert severity="error" className={classes.alert}>
                {errors}
              </Alert>
            </Grid>
          )}
        </Grid>
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} lg={5}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Type any post ..."
              required
              fullWidth
              error={errors ? true : false}
              id="body"
              type="text"
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
              name="body"
              autoComplete="body"
              onChange={onChange}
              value={values.body}
            />
            <span className={classes.buttonWrapper}>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                {loading ? (
                  <CircularProgress size={24} style={{ color: "black" }} />
                ) : (
                  "Save"
                )}
              </Button>
            </span>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
