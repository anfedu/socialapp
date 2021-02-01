import React, { useState, useContext } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  IconButton,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import NavBar from "../components/NavBar";
import { useForm } from "../util/hooks";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import FooterContent from "../components/FooterContent";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { LOGIN_USER } from "../util/graphql";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    display: "flex",
    color: "#bbb",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "none",
    fontWeight: "bold",
  },
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
  },
  alert: {
    margin: "5px 0",
    border: "1px solid rgba(156, 39, 176, 0.8)",
    borderRadius: 5,
    width: "100%",
    backgroundColor: "rgba(156, 39, 176, 0.2)",
    color: "#ccc",
  },
}));

export default function Login(props) {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const [errors, setErrors] = useState("");
  const { onChange, handleSubmit, values, setValues } = useForm(loginUser, {
    username: "",
    password: "",
    showPassword: false,
  });

  const [user, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
    variables: values,
  });

  function loginUser() {
    user();
  }

  // show password
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // --->

  return (
    <>
      <NavBar />
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <div className={classes.root}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" className={classes.alert}>
              {errors}
            </Alert>
          )}
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  size="small"
                  placeholder="Username"
                  fullWidth
                  id="username"
                  type="text"
                  error={errors.username ? true : false}
                  name="username"
                  autoComplete="username"
                  value={values.username}
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
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  name="password"
                  type={values.showPassword ? "text" : "password"}
                  placeholder="Password"
                  error={errors.password ? true : false}
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
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
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility style={{ color: "#ccc" }} />
                          ) : (
                            <VisibilityOff style={{ color: "#888" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              color="secondary"
              variant="contained"
              className={classes.submit}
              onClick={handleSubmit}
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <Box align="center">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "aqua" }}
            >
              Register here
            </Link>
          </Box>
        </div>
      </Container>
      <FooterContent />
    </>
  );
}
