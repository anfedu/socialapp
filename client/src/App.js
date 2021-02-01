import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import SinglePost from "./pages/SinglePost";
import { makeStyles } from "@material-ui/core/styles";
import bghome from "./image/vintage.png";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(61, 228, 142, 0.2)), url(${bghome})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root} id="header">
      <AuthProvider>
        <Router>
          <AuthRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <AuthRoute path="/posts/:postId" component={SinglePost} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
