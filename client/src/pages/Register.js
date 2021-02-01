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
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import EmailIcon from "@material-ui/icons/Email";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../components/NavBar";
import { useMutation } from "@apollo/react-hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import FooterContent from "../components/FooterContent";
import { REGISTER_USER } from "../util/graphql";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    display: "flex",
    color: "#bbb",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
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
    fontWeight: "bold",
    textTransform: "none",
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

export default function Register(props) {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const [errors, setErrors] = useState({});

  const errorDisplay =
    errors[Object.keys(errors)[Object.keys(errors).length - 1]];

  const { onChange, handleSubmit, values, setValues } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword1: false,
    showPassword2: false,
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      console.log(err, "iki error e register");
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  // show password
  const handleClickShowPassword1 = () => {
    setValues({ ...values, showPassword1: !values.showPassword1 });
  };
  const handleClickShowPassword2 = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 });
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
            Register
          </Typography>
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" className={classes.alert}>
              {errorDisplay}
            </Alert>
          )}
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  id="username"
                  type="text"
                  placeholder="Username"
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
                  id="email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  error={errors.email ? true : false}
                  autoComplete="email"
                  value={values.email}
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
                        <EmailIcon />
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
                  type={values.showPassword1 ? "text" : "password"}
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
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword1 ? (
                            <Visibility style={{ color: "#ccc" }} />
                          ) : (
                            <VisibilityOff style={{ color: "#888" }} />
                          )}
                        </IconButton>
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
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type={values.showPassword2 ? "text" : "password"}
                  error={errors.confirmPassword ? true : false}
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  value={values.confirmPassword}
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
                        <LockOpenIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword2 ? (
                            <Visibility style={{ color: "#ccc" }} />
                          ) : (
                            <VisibilityOff style={{ color: "#888" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Register"
              )}
            </Button>
          </form>
          <Box align="center">
            Don't have an account yet?{" "}
            <Link to="/login" style={{ textDecoration: "none", color: "aqua" }}>
              Login here
            </Link>
          </Box>
        </div>
        <br />
      </Container>
      <FooterContent />
    </>
  );
}
